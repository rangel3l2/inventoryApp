from abc import ABC, abstractmethod

class ITokenRepository(ABC):
    @abstractmethod
    def save(self, token: str) -> None:
        pass
