from django.urls import path
from .views import index_view ,comments, cswall, gallery, alumni_view, json_wall, one_wall

app_name = 'home'
urlpatterns = [
    path('', index_view,name='index'),
    path('index', index_view,name='index'),
    path('comments', comments,name='comments'),
    path('cswall', cswall,name='cswall'),
    path('gallery', gallery,name='gallery'),
    path('alumni_no', alumni_view),
    path('all_json', json_wall),
    path('one/<int:id>', one_wall),
]
