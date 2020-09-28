
Vue.component('clube', {
    props: ['time'],
    template: `
    <div>
        <img :src="time.escudo" class="escudo"> - 
        {{time.nome}}        
    </div>
    `
})
//------------------------------------

Vue.component('clube-libertadores', {
    props: ['times'],
    template: `
    <div>
    <div class="col-8">
        <span><h3 class="mt-3 mb-3">Classificados para Libertadores Vue.js</h3></span>     
    </div>
    <div class="mt-3">
        <table class="table  table-striped">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Nome</th>
                <th scope="col">Pontos</th>
                <th scope="col">Gols Marcados</th>
                <th scope="col">Gols Sofridos</th>
                <th scope="col">Saldo</th>
                </tr>
            </thead>
            <tbody>

                <tr v-for="time in timesLibertadores">
                <th scope="row">1</th>
                <td>
                    <clube :time="time"></clube>
                </td>
                <td>{{time.pontos}}</td>
                <td>{{time.gm}}</td>
                <td>{{time.gs}}</td>
                <td>{{time.saldo}}</td>
                </tr>
            
            </tbody>
        </table>
    </div>
    </div>
    `,
    computed: {
        timesLibertadores(){
            return this.times.slice(0,4)
        },
    },
})

Vue.component('clube-rebaixados', {
    props: ['times'],
    template: `
<div>
    <div class="col-8">
        <span><h3 class="mt-3 mb-3">Times Rebaixados</h3></span>     
    </div>
    <div class="mt-3">
        <table class="table  table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Nome</th>
                <th scope="col">Pontos</th>
                <th scope="col">Gols Marcados</th>
                <th scope="col">Gols Sofridos</th>
                <th scope="col">Saldo</th>
              </tr>
            </thead>
            <tbody>

              <tr v-for="time in timesRebaixados">
                <th scope="row">1</th>
                <td>
                    <clube :time="time"></clube>
                </td>
                <td>{{time.pontos}}</td>
                <td>{{time.gm}}</td>
                <td>{{time.gs}}</td>
                <td>{{time.saldo}}</td>
              </tr>
            
            </tbody>
          </table>
    </div> 
</div>
    `,
    computed: {
        timesRebaixados(){
            return this.times.slice(16,20)
        },
    },
})


//Instância Vue
new Vue({
    el: "#app",
    data:{
        golsCasa: '',
        golsVisitante: '',
        fimDeJogo: 'fim',
        busca: '',
        ordem: {
            colunas: ['pontos', 'gm', 'gs', 'saldo'],
            orientacao: ['desc', 'asc', 'asc', 'desc'], 
        },
        //orientacao: 'desc',
        times: [
            new Time('Palmeiras', 'assets/palmeiras_60x60.png'),
            new Time('Internacional', 'assets/internacional_60x60.png'),
            new Time('Flamengo', 'assets/flamengo_60x60.png'),
            new Time('Atlético-MG', 'assets/atletico_mg_60x60.png'),
            new Time('Santos', 'assets/santos_60x60.png'),
            new Time('Botafogo', 'assets/botafogo_60x60.png'),
            new Time('Atlético-PR', 'assets/atletico-pr_60x60.png'),
            new Time('Corinthians', 'assets/corinthians_60x60.png'),
            new Time('Grêmio', 'assets/gremio_60x60.png'),
            new Time('Fluminense', 'assets/fluminense_60x60.png'),
            new Time('Bahia', 'assets/bahia_60x60.png'),
            new Time('Chapecoense', 'assets/chapecoense_60x60.png'),
            new Time('São Paulo', 'assets/sao_paulo_60x60.png'),
            new Time('Cruzeiro', 'assets/cruzeiro_60x60.png'),
            new Time('Sport', 'assets/sport_60x60.png'),
            new Time('Ceará', 'assets/ceara_60x60.png'),
            new Time('Vitória', 'assets/vitoria_60x60.png'),
            new Time('Vasco', 'assets/vasco_60x60.png'),
            new Time('América-MG', 'assets/america_mg_60x60.png'),
            new Time('Paraná', 'assets/parana_60x60.png'),
        ],
        novoJogo:{
            casa:{
                time: null,
                gols: 0
            },
            fora:{
                time: null,
                gols: 0
            },
        }
    },
    computed: {
        timesFiltrados(){
            var self = this;
            return _.filter(this.timesOrdered, function(time){
                var busca = self.busca.toLowerCase();
                return time.nome.toLowerCase().indexOf(busca) >= 0;
                })
        },

        timesOrdered() {
            return _.orderBy(this.times, this.ordem.colunas, this.ordem.orientacao);
        }
    },
    methods:{
        criarNovoJogo(){
            var indiceCasa = Math.floor(Math.random() * 20);
            var indiceFora = Math.floor(Math.random() * 20);

            this.novoJogo.casa.time = this.times[indiceCasa];
            this.novoJogo.casa.gols = Math.floor(Math.random() * 7 + 1);
            this.novoJogo.fora.time = this.times[indiceFora];
            this.novoJogo.fora.gols = Math.floor(Math.random() * 6 + 1);
            this.fimDeJogo = 'fim';
        },
        fimJogo(){
            let golsMarcados = parseInt(this.novoJogo.casa.gols);
            let golsSofrios = parseInt(this.novoJogo.fora.gols);
            let timeCasa = this.novoJogo.casa.time;
            let timeAdvesario = this.novoJogo.fora.time;
            timeCasa.fimJogo(timeAdvesario, golsMarcados, golsSofrios);
            this.fimDeJogo = 'novo';

        },
        ordenar(indice){
            //this.ordem.orientacao[indice] = this.ordem.orientacao[indice] =='desc' ? 'asc' : 'desc';
            this.$set(this.ordem.orientacao, indice, this.ordem.orientacao[indice] =='desc'? 'asc':'desc')
        }
    }
})