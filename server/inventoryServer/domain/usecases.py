from interfaces import ITokenRepository
from app.domain.User import Usuario
from jwt import encode
from config import SECRET_KEY, ALGORITHM

class GerarToken:
    def __init__(self, token_repository: ITokenRepository) -> None:
        self.token_repository = token_repository

    def execute(self, user: Usuario) -> str:
        payload = {
            "id": user.id,
            "name": user.name,
            "role": user.role,
        }
        token = encode(payload, SECRET_KEY, algorithm=ALGORITHM)
        self.token_repository.save(token)
        return token
