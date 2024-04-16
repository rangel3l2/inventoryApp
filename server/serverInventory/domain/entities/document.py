

class DocumentText:
    def __init__(self,  filename: str, path: str, ):
        
        self.filename = filename
        self.path = path

    
    def get_absolute_path(self):
        return self.path + self.filename