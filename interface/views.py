from django.shortcuts import render
from django.http import HttpResponse
import serial
import json
import time
# Create your views here.
arduino = 0


def index(request):
    return render(request, 'index.html', context={})


def sendData(request):
    arduino = serial.Serial('COM5', 57600)
    separator = '|'
    speed: int = int(request.GET.get('speed'))
    # this because the speed needs to be mapped due to screen differences with page selects
    speed = int(speed/2)
    text: str = request.GET.get('text')

    speed = str(speed)

    encodedText = str.encode(text+separator+speed)

    time.sleep(5)
    arduino.write(encodedText)
    time.sleep(2)
    arduino.close()

    data = {
        'status': 'OK',
        'code': 202
    }
    return HttpResponse(json.dumps(data), content_type='application/json')
