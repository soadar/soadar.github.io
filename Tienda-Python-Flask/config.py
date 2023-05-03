from decouple import config


class Config:
    SECRET_KEY = '^-.-^20j8^92ejf^0j/*/*/^-.-^'


class DevelopmentConfig(Config):
    DEBUG = True
    MYSQL_HOST = 'localhost'
    MYSQL_USER = 'root'
    # MYSQL_PASSWORD = ''
    MYSQL_DB = 'tienda'
    # MAIL_SERVER = 'smtp.gmail.com'
    # MAIL_PORT = 465  # 587 TLS
    # MAIL_USE_TLS = False
    # MAIL_USE_SSL = True
    # MAIL_USERNAME = 'laabuuroo@gmail.com'
    # MAIL_PASSWORD = config('MAIL_PASSWORD')


config = {
    'development': DevelopmentConfig,
    'default': DevelopmentConfig
}
