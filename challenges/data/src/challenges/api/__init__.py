class NumbersList(object):
	def __init__(self, **kwargs):
		setattr(self, 'values', kwargs.get('values', None))