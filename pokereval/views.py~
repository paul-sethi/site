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
	try:
		# TODO: need to check if hand range (request body) is null, and also insert ALL hands for second range
		result = pbots_calc.calc(request.body + ":ATs","","",1000000)
		if result:
			return HttpResponse(str(result))
		else:
			return HttpResponse("Error")
	except:
		return HttpResponse("Error")
