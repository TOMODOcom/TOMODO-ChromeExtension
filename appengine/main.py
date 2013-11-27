import webapp2
import logging

class MainPage(webapp2.RequestHandler):

    def get(self):
        # self.response.headers['Content-Type'] = 'text/plain'
        self.response.write(open('./index.html').read())


application = webapp2.WSGIApplication([
    ('/', MainPage),
    ('', MainPage),
    ('/*', MainPage),
], debug=True)
