from users.forms import RegistrationForm
from django.urls import reverse_lazy
from django.views import generic
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404

class SignUpView(generic.CreateView):
    form_class = RegistrationForm
    template_name = 'signup.html'
    success_url = reverse_lazy('login')

class UserProfileView(generic.DetailView):
    model = User
    template_name = 'user_profile.html'

    def get_object(self):
        return get_object_or_404(User, username=self.kwargs['username'])
