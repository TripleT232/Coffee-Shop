from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Order, OrderItem

class CreateOrder(APIView):
    def post(self, request):
        user = request.user
        items = request.data.get('items')

        order = Order.objects.create(user=user, total_price=0)

        total = 0
        for item in items:
            price = item['price']
            quantity = item['quantity']
            total += price * quantity

            OrderItem.objects.create(
                order=order,
                product_id=item['product_id'],
                quantity=quantity,
                price=price
            )

        order.total_price = total
        order.save()

        return Response({"message": "Order created"})