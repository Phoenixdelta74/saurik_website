"""Exercise the production handler through FastAPI without loading a GPU model."""
import ast
import asyncio
import os
from pathlib import Path

import httpx
from fastapi import FastAPI, Header

source = Path(__file__).resolve().parents[1] / "deploy" / "modal_maya_app.py"
tree = ast.parse(source.read_text(encoding="utf-8"))
service = next(node for node in tree.body if isinstance(node, ast.ClassDef) and node.name == "MayaTTSService")
handler = next(node for node in service.body if isinstance(node, ast.FunctionDef) and node.name == "speech")
handler.decorator_list = []
service.decorator_list = []
service.body = [handler]
namespace = {"Header": Header, "os": os}
exec(compile(ast.fix_missing_locations(ast.Module(body=[service], type_ignores=[])), str(source), "exec"), namespace)
app = FastAPI()
app.post('/speech')(namespace['MayaTTSService']().speech)


async def run():
    os.environ['MAYA_AUTH_TOKEN'] = 'integration-test-token'
    async with httpx.AsyncClient(transport=httpx.ASGITransport(app=app), base_url='http://test') as client:
        for headers, expected in [({}, 401), ({'Authorization': 'Bearer wrong'}, 401), ({'Authorization': 'Bearer integration-test-token'}, 200)]:
            response = await client.post('/speech', json={'health': True}, headers=headers)
            assert response.status_code == expected, (response.status_code, response.text)
            if expected == 200:
                assert response.json()['status'] == 'ready'
    print('Maya FastAPI handler: missing and wrong credentials rejected; valid header accepted.')


asyncio.run(run())
