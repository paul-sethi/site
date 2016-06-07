from django.shortcuts import render
from django.http import HttpResponse

import pbots_calc

# Create your views here.

def index(request):
	r = pbots_calc.calc("ATs:89s","","",1000000)
	if r:
		return HttpResponse(str(r))
	else:
		return HttpResponse("error")
