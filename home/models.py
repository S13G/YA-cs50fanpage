from re import L
from django.db import models
from django.utils import timezone
# Create your models here.

# 3 models -> comments, alumni,wall

class Comment(models.Model):
    author =  models.CharField(max_length=31)
    text = models.TextField()
    posted = models.DateTimeField(default=timezone.now)
    str_date = models.CharField(max_length=31, blank=True, null=True)

    def __str__(self):
        return f"{self.author} => {self.posted}"
    
    def save(self, *args,**kwargs):
        self.str_date = self.posted.strftime('%B %d %Y')
        super().save(*args,**kwargs)
    
    class meta:
        ordering = ['-posted']

class Alumni(models.Model):
    email = models.EmailField()

    def __str__(self):
        return self.email

class Wall(models.Model):
    grid = models.PositiveIntegerField()
    username = models.CharField(max_length=31)
    font = models.TextField()
    link = models.URLField()

    def __str__(self):
        return f'{self.grid} - {self.username}'