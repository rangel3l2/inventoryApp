

class AuthError(Exception):
    code: int
    message: str
    details: str = None

    def __init__(self, message: str, code: int, details: str = None):
        super().__init__(message)
        self.code = code
        self.message = message
        self.details = details
