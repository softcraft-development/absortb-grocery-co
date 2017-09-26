Promotions
==========

Multiple Promotions
-------------------

What happens when you have multiple promotions for the same item? This is how super couponing works. For this simple task, it's not defined, so I'm not going to worry about it too much. In a real app, I'd go back to the domain experts / business analysts and present some scenarios to get confirmation. For this test app, I'm just going to apply the promotion with the *greatest* discount.

Multiply Applied Promotions
---------------------------

What happens when the customer buys enough product to satisfy the promotion criteria multiple times? It'd be a policy decision whether or not to apply the discount multiple times or just once (I've seen both in the real world). For the purposes of this project, I'll assume that each promotion with a quantity criteria can only be applied once.