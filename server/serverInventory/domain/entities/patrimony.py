from infrastructure.database.models import Patrimony

class Patrimony(Patrimony):
    def __init__(self, codbar : int= None, dt_inventario=None, observacao: str=None, responsavel: str=None, setor_responsavel: str=None, status=None, inventariante_id=None, local_encontrado_id=None, local_id=None, produto_id=None, product_id=None):
        self.codbar = codbar
        self.dt_inventario = dt_inventario
        self.observacao = observacao
        self.responsavel = responsavel
        self.setor_responsavel = setor_responsavel
        self.status = status
        self.inventariante_id = inventariante_id
        self.local_encontrado_id = local_encontrado_id
        self.local_id = local_id
        self.produto_id = produto_id
        self.product_id = product_id
        
    def to_dict(self):
        return {'codbar': self.codbar, 'dt_inventario': self.dt_inventario, 'observacao': self.observacao, 'responsavel': self.responsavel, 'setor_responsavel': self.setor_responsavel, 'status': self.status, 'inventariante_id': self.inventariante_id, 'local_encontrado_id': self.local_encontrado_id, 'local_id': self.local_id, 'produto_id': self.produto_id,
                'product_id': self.product_id }