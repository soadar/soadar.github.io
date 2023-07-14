from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow

app = Flask(__name__)

CORS(app)

app.config['SQLALCHEMY_DATABASE_URI']='mysql+pymysql://soadar:prUeB()5@soadar.mysql.pythonanywhere-services.com/soadar$default'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']=False

# PERMITE MANIPULAR LA BASE DE DATOS DE LA APP
db = SQLAlchemy(app)
ma = Marshmallow(app)

# DEFINIR LA CLASE PRODUCTO (ESTRUCTURA DE LA TABLA DE UNA BASE DE DATOS)
class Album(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    released_date = db.Column(db.DateTime())
    produced_by = db.Column(db.String(200))
    label = db.Column(db.String(50))
    recorded_at = db.Column(db.String(200))
    tour = db.Column(db.String(100))
    imagen = db.Column(db.String(500))


    def __init__(self, name, released_date, produced_by, label, recorded_at, tour, imagen):
        self.name = name
        self.released_date = released_date
        self.produced_by = produced_by
        self.label = label
        self.recorded_at = recorded_at
        self.tour = tour
        self.imagen = imagen



# CÓDIGO QUE CREARÁ TODAS LAS TABLAS
with app.app_context():
    db.create_all()



# CLASE QUE PERMITIRÁ ACCEDER A LOS MÉTODOS DE CONVERSIÓN DE DATOS
class AlbumSchema(ma.Schema):
    class Meta:
        fields = ("id", "name", "released_date", "produced_by", "label", "recorded_at", "tour", "imagen")


# CREAR DOS OBJETOS
album_schema = AlbumSchema()
albums_schema = AlbumSchema(many=True)



# RUTAS
# '/albums' ENDPOINT PARA RECIBIR DATOS: POST
# '/albums' ENDPOINT PARA MOSTRAR TODOS LOS ALBUMSS DISPONIBLES EN LA BASE DE DATOS: GET
# '/albums/<id>' ENDPOINT PARA MOSTRAR UN ALBUM POR ID: GET
# '/albums/<id>' ENDPOINT PARA BORRAR UN ALBUM POR ID: DELETE
# '/albums/<id>' ENDPOINT PARA MODIFICAR UN ALBUM POR ID: PUT


# ENDPOINT/RUTA

@app.route('/')
def saludo():
    return 'Bienvenido!'

@app.route("/albums", methods=['GET'])
def get_albums():
    # CONSULTAR TODA LA INFO EN LA TABLA ALBUM
    all_albums = Album.query.all()

    return albums_schema.jsonify(all_albums)


# RUTA CREAR UN NUEVO REGISTRO EN LA TABLA


@app.route("/albums", methods=['POST'])
def create_album():


    #EJEMPLO:
    #ENTRADA DE DATOS

    """
   # {
        "name": "BOY",
        "released_date":" 1980-10-20",
        "produced_by": "Steve Lillywhite",
        "label": "Island Records",
        "recorded_at": "Windmill Lane Studios, Dublin",
        "tour": "Boy Tour, 1980-1981",
        "imagen": "https://cdn.ontourmedia.io/u2/non_secure/images/20090217/discography/albumcover__boy/600.jpg"
    }
"""



    # RECIBEN LOS DATOS
    name = request.json['name']
    released_date = request.json['released_date']
    produced_by = request.json['produced_by']
    label = request.json['label']
    recorded_at = request.json['recorded_at']
    tour = request.json['tour']
    imagen = request.json['imagen']

    # INSERTAR EN DB
    new_album = Album(name, released_date, produced_by, label, recorded_at, tour, imagen)
    db.session.add(new_album)
    db.session.commit()

    return album_schema.jsonify(new_album)


# MOSTRAR ALBUM POR ID
@app.route('/albums/<id>',methods=['GET'])
def get_album(id):
    # Consultar por id, a la clase Album.
    #  Se hace una consulta (query) para obtener (get) un registro por id
    album = Album.query.get(id)

   # Retorna el JSON de un album recibido como parámetro
   # Para ello, usar el objeto album_schema para que convierta con jsonify los datos recién ingresados que son objetos a JSON
    return album_schema.jsonify(album)



# BORRAR
@app.route('/albums/<id>',methods=['DELETE'])
def delete_album(id):
    # Consultar por id, a la clase Album.
    #  Se hace una consulta (query) para obtener (get) un registro por id
    album = Album.query.get(id)

    # A partir de db y la sesión establecida con la base de datos borrar
    # el producto.
    # Se guardan lo cambios con commit
    db.session.delete(album)
    db.session.commit()
    return album_schema.jsonify(album)


# MODIFICAR
@app.route('/albums/<id>', methods=['PUT'])
def update_album(id):
    # Consultar por id, a la clase Album.
    #  Se hace una consulta (query) para obtener (get) un registro por id
    album = Album.query.get(id)

    #  Recibir los datos a modificar
    name = request.json['name']
    released_date = request.json['released_date']
    produced_by = request.json['produced_by']
    label = request.json['label']
    recorded_at = request.json['recorded_at']
    tour = request.json['tour']
    imagen = request.json['imagen']

    # Del objeto resultante de la consulta modificar los valores
    album.name = name
    album.released_date = released_date
    album.produced_by = produced_by
    album.label = label
    album.recorded_at = recorded_at
    album.tour = tour
    album.imagen = imagen
    #  Guardar los cambios
    db.session.commit()
   # Para ello, usar el objeto album_schema para que convierta con jsonify el dato recién eliminado que son objetos a JSON
    return album_schema.jsonify(album)
