import * as React from "react";


class RulesPanel extends React.Component {


    constructor(props) {
        super(props);
    }

    render() {
        return (
            <table>
                <tbody>
                <tr>
                    <td>Приветствуем в игре с элементами программирования</td>
                </tr>
                <tr>
                    <td>Немного о правилах и игре. Игроку будут предлагаться задания,
                        суть которых - составить программу действия для своего любимого персонажа.
                        По правилам игры вам необходимо построить последовательность стрелок,
                        чтобы ваш герой двигаясь согласно каждой из них достиг цели. Если вы выйдете
                        за границы или столкнетесь с препятствием, то ваша попытка сгорает. Если вы не
                        построили свой алгоритм за определенный промежуток времени, то ваша попытка также сгорает.
                        В игре будет несколько уровней, которые могут оличаться по сложности. Количество уровней
                        их сложность и еще кое-что можно настроить на следующей страничке.
                        Жми далее и давай пробовать!
                    </td>
                </tr>
                </tbody>

            </table>
        );
    }


}

export default RulesPanel
