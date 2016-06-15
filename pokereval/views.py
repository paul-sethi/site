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

def evaluator(request):
	response = HttpResponse("blah")
	response.status=200
	return HttpResponse("blah");
	
