from django.db import models

class Item(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

    class Meta:
        # This ensures the table name is correct
        db_table = 'api_item'
        # This ensures a more descriptive name in the admin
        verbose_name = 'Item'
        verbose_name_plural = 'Items'
