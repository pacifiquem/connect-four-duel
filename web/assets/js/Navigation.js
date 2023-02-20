import { $ } from './helpers.js'

export class Navigation {
    constructor() {
        this.$transitionScreen = $('.transition-screen')
    }

    init(game, data) {
        this.game = game
        this.data = data

        this.listenEvents()
    }

    listenEvents() {
        $('.btn-pvc').addEventListener('click', this.toGameCPU.bind(this))
        $('.btn-pvp').addEventListener('click', this.toGame.bind(this))
        $('.btn-rules').addEventListener('click', this.toRules.bind(this))
        $('.btn-ok-rules').addEventListener('click', this.acceptRules.bind(this))
        $('.btn-menu').addEventListener('click', this.pause.bind(this))
        $('.btn-restart').addEventListener('click', this.restart.bind(this))
        $('.btn-play').addEventListener('click', this.start.bind(this))
        $('.btn-continue').addEventListener('click', this.unpause.bind(this))
        $('.btn-restart-menu').addEventListener('click', this.restart.bind(this))
        $('.btn-quit').addEventListener('click', this.quit.bind(this))
        $('.ingame-menu').addEventListener('click', this.closeMenu.bind(this))
    }

    fadeIn() {
        this.data.transitioning = true

        return new Promise(r => this.$transitionScreen.addEventListener('transitionend', r))
    }

    fadeOut() {
        delete this.data.transitioning
    }

    toRules() {
        this.data.rules = true
    }

    acceptRules() {
        delete this.data.rules
    }

    async toGame() {
        await this.fadeIn()

        this.data.ingame = true
        this.data.state = 'start'
        delete this.data.pvc
        this.game.isAgainstCPU = false

        this.fadeOut()
    }

    async toGameCPU() {
        await this.fadeIn()

        this.data.ingame = true
        this.data.state = 'start'
        this.data.pvc = true
        this.game.isAgainstCPU = true

        this.fadeOut()
    }

    start() {
        this.game.start()

        this.data.state = 'playing'
    }

    async restart() {
        this.unpause()
        
        await this.fadeIn()

        this.data.state = 'start'
        delete this.data.isDraw

        this.game.reset()

        this.fadeOut()
    }

    pause() {
        this.data.paused = true
    }

    unpause() {
        delete this.data.paused
    }

    async quit() {
        await this.fadeIn()

        delete this.data.ingame
        delete this.data.paused
        delete this.data.isDraw

        this.game.reset()

        this.fadeOut()
    }

    closeMenu(e) {
        if (!e.target.classList.contains('ingame-menu__wrapper')) return

        this.unpause()
    }

    togglePause() {
        if (!this.data.ingame) return

        if (this.data.paused) this.unpause()
        else this.pause()
    }
}