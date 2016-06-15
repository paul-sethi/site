from django.conf.urls import url
from django.views.generic import TemplateView
from . import views

app_name = 'pokereval'

urlpatterns = [
	url(r'^$', TemplateView.as_view(template_name='pokereval/index.html')),
	url(r'^eval/$', views.evaluator, name='eval'),
]
