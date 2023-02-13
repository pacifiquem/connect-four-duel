import { $, times } from './helpers.js'
import { Navigation } from './Navigation.js'
import { Control } from './Control.js'

export class View {
    constructor() {
        this.data = $('body').dataset
        this.timerData = $('.timer').dataset
        this.score1Data = $('.score1').dataset
        this.score2Data = $('.score2').dataset
        
        this.navigation = new Navigation()
        this.control = new Control()
    }

    init(game, nColumn, nRow, turnDuration) {
        const {$columns, $slots} = this.buildGrid(nColumn, nRow)

        this.$slots = $slots
        this.$columns = $columns
        this.turnDuration = turnDuration
        
        this.navigation.init(game, this.data)
        
        this.control.init(game, this.navigation, $columns)
    }

    buildGrid(nColumn, nRow) {
        const $columns = [], $slots = []
        const $grid = $('.grid__wrapper')

        times(nColumn, () => {
            const $column = document.createElement('div')
            $column.classList.add('column')

            times(nRow, () => {
                const $slot = document.createElement('div')
                $slot.classList.add('slot')

                $slots.push($slot)
            
                $column.appendChild($slot)
            })

            $columns.push($column)
            
            $grid.appendChild($column)
        })

        return {$columns, $slots}
    }

    newTurn(isPlayer1, fullColumns, freeColumns) {
        this.data.player = isPlayer1 ? 1 : 2

        const timerData = this.timerData
        timerData.value = this.turnDuration
        const onInterval = () => { timerData.value-- }
        this.timerInterval = setInterval(onInterval, 1000)

        this.control.newTurn(fullColumns, freeColumns)
    }

    getSlot(x, y) {
        const n = x * 6 + 5 - y

        return this.$slots[n]
    }

    async addDisc(disc) {
        clearInterval(this.timerInterval)
        
        this.data.dropping = true

        const $slot = this.getSlot(disc.x, disc.y)

        $slot.style.translate = `0 -${(6 - disc.y) * 100}%`
        $slot.offsetWidth
        $slot.classList.add(`slot--p${disc.player}`)
        $slot.style.removeProperty('translate')

        await new Promise(r => $slot.addEventListener('transitionend', r))

        delete this.data.dropping
    }

    resetGrid() {
        clearInterval(this.timerInterval)
        
        for (const $column of this.$columns) $column.className = 'column'
        for (const $slot of this.$slots) $slot.className = 'slot'
    }

    end(winningDiscs, isDraw) {
        clearInterval(this.timerInterval)
        
        this.data.state = 'end'
        this.data.isDraw = isDraw

        if (isDraw) return
        
        for (const disc of winningDiscs)
            this.getSlot(disc.x, disc.y).classList.add('slot--win')
    }

    updateScores(scores) {
        this.score1Data.value = scores[0]
        this.score2Data.value = scores[1]
    }
}