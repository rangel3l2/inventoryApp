class UserRepository:
    def __init__(self, database_adapter):
        self.database_adapter = database_adapter

    def get_user_by_barcode(self, barcode):
        # Delega a busca ao database_adapter
        return self.database_adapter.get_user_by_barcode(barcode)