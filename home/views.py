
from django.http import HttpResponse
from django.shortcuts import render
from .models import Comment, Alumni, Wall
from django.core import serializers
# Create your views here.

def index_view(request):
    if request.method == 'POST':
        mail = request.POST['email']
        note = request.POST['note']
        if len(mail) > 1 and len(note) > 1 and len(Alumni.objects.filter(email=mail)) == 0:
            all_alumni = Alumni(email=mail)
            all_alumni.save();
    return render(request,'index.html')

def alumni_view(request):
    alumni = len(Alumni.objects.all())
    num = alumni + 200000
    return HttpResponse(num)

def json_wall(request):
    them = Wall.objects.all()
    them_js = serializers.serialize('json',them)
    return HttpResponse(them_js,content_type='application/json')

def one_wall(request,id):
    them = Wall.objects.filter(grid=id)
    them_js = serializers.serialize('json',them)
    return HttpResponse(them_js,content_type='application/json')

def comments(request):
    if request.method == 'POST':
        author = request.POST['name']
        text = request.POST['comments']
        if(len(author) > 1 and len(text) > 1):
            user_comment = Comment(author=author,text=text)
            user_comment.save();
    comments_dem = Comment.objects.all().order_by('-posted').values()
    return render(request,'comments/comments.html',context={
        'comments':comments_dem
    })

fonts_array = [
  "serif",
  "sans-serif",
  "monospace",
  "cursive",
  "fantasy",
  "system-ui",
  "Times New Roman",
  "Courier New",
  "Lucida Sans",
  "Almendra SC,serif",
  "Amatic SC,cursive",
  "Arbutus,cursive",
  "Bangers,cursive",
  "Caesar Dressing,cursive",
  "Comforter Brush,cursive",
  "Cormorant SC,serif",
  "DynaPuff,cursive",
  "Exo,sans-serif",
  "Hanalei Fill,cursive",
  "Josefin Sans,sans-serif",
  "Lato,sans-serif",
  "Limelight,cursive",
  "Marvel,sans-serif",
  "Open Sans,sans-serif",
  "Podkova,serif",
  "Poppins,sans-serif",
  "Rubik Moonrocks,cursive",
  "Shadows Into Light,cursive",
  "Share,cursive",
  "Yanone Kaffeesatz,sans-serif",
]
def cswall(request):
    if request.method == 'POST':
        username = request.POST['name']
        font = request.POST['font']
        grid = request.POST['gridnumber']
        link = request.POST['link']
        if font in fonts_array:
            json_user = Wall(username=username,grid=grid,font=font,link=link)
            json_user.save();
    return render(request,'cswall/cswall.html')

def gallery(request):
    return render(request,'fangallery/fangallery.html')