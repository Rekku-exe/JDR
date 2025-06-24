function headerEntityDom(name) {
    return {
        tag: 'h4',
        inner: [
            {
                tag: 'i',
                inner: [
                    'V'
                ],
            },
            name
        ],
    }
}

function enemyDom(name) {
    return {
        tag: 'li',
        inner: [
            headerEntityDom(name)
        ]
    }
}

function allyDom(name) {
    return {
        tag: 'li',
        inner: [
            headerEntityDom(name),
            {
                tag: 'div',
                attr: {
                    class: 'entity_stats player_stats'
                },
                inner: [
                    {
                        tag: 'div',
                        attr: {
                            class: 'entity_stat player_stat'
                        },
                        inner: [
                            {
                                tag: 'span',
                                attr: {
                                    class: 'entity_stat_label player_stat_label'
                                },
                                inner: [
                                    'PV'
                                ]
                            },
                            {
                                tag: 'span',
                                attr: {
                                    class: 'entity_stat_bar player_stat_bar --health'
                                }
                            }
                        ]
                    },
                    {
                        tag: 'div',
                        attr: {
                            class: 'entity_stat player_stat'
                        },
                        inner: [
                            {
                                tag: 'span',
                                attr: {
                                    class: 'entity_stat_label player_stat_label'
                                },
                                inner: [
                                    'Armor'
                                ]
                            },
                            {
                                tag: 'span',
                                attr: {
                                    class: 'entity_stat_bar player_stat_bar --armor'
                                }
                            }
                        ]
                    },
                    {
                        tag: 'div',
                        attr: {
                            class: 'entity_stat player_stat'
                        },
                        inner: [
                            {
                                tag: 'span',
                                attr: {
                                    class: 'entity_stat_label player_stat_label'
                                },
                                inner: [
                                    'Mana'
                                ]
                            },
                            {
                                tag: 'span',
                                attr: {
                                    class: 'entity_stat_bar player_stat_bar --mana'
                                }
                            }
                        ]
                    },
                ]
            }
        ]
    }
}

function renderVDom(vDom) {
    let dom;
    if (vDom.tag) {
        dom = document.createElement(vDom.tag);
        if (vDom.attr) {
            for (const [key, value] of Object.entries(vDom.attr)) {
                dom.setAttribute(key, value);
            }
        }
        if (vDom.inner) {
            for (const c of vDom.inner) {
                dom.append(renderVDom(c));
            }
        }
        if (vDom.innerText) {
            dom.innerText = vDom.innerText;
        }
    } else {
        dom = vDom;
    }
    return dom;
}