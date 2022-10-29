from django.contrib import admin
from .models import Comment, Alumni, Wall


# Register your models here.
admin.site.register(Comment)
admin.site.register(Alumni)
admin.site.register(Wall)