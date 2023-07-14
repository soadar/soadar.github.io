const { createApp } = Vue

createApp({
    data() {
        return {
            url: "https://soadar.pythonanywhere.com/albums",
            albums: [],
            error: false,
            cargando: true
        }
    },
    // Se llama después de que la instancia haya 
    // terminado de procesar todas las opciones relacionadas con el estado.
    created() {
        this.fetchData(this.url)
    },
    methods: {
        fetchData(url) {
            // Acá se consume la Api
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.albums = data;
                    this.cargando = false
                })
                .catch(err => {
                    console.error(err);
                    this.error = true
                })
        },
        // album; es el id que necesita para buscar en la DB y eliminarlo
        eliminar(album) {
            const url = 'https://soadar.pythonanywhere.com/albums/' + album;
            var options = {
                method: 'DELETE',
            }
            fetch(url, options)
                .then(res => res.text()) // or res.json()
                .then(res => {
                    alert("Registro eliminado")
                    location.reload();
                })
        }


    },




}).mount('#app')