ALTER TABLE usuario
	ADD CONSTRAINT FK_usuario_tipousuario
    FOREIGN KEY (tipousuario_id) REFERENCES tipousuario (id);


ALTER TABLE libro
	ADD CONSTRAINT FK_libro_autor
    FOREIGN KEY (autor_id) REFERENCES autor (id);


ALTER TABLE compra
	ADD CONSTRAINT FK_compra_libro
    FOREIGN KEY (libro_isbn) REFERENCES libro (isbn);

ALTER TABLE compra
	ADD CONSTRAINT FK_compra_usuario
    FOREIGN KEY (usuario_id) REFERENCES usuario (id);

