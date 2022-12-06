import random

import flask
import json
import requests
import re
from urllib import parse
from predict import main
api = flask.Flask(__name__)
# 'index'是接口路径，methods不写，默认get请求
@api.route('/index', methods=['get'])
# post方式访问
def init_api(data):
    print('datadata',data)

if __name__ == '__main__':
    main()
    api.run(port=4000, debug=False)  # 启动服务
