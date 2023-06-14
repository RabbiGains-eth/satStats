import React from 'react';

export default class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="header-container">
                <div className="header-inner">
                    <nav>
                        <a href="#" className={`headerButtons ${this.props.selectedButton === 'diamond' ? 'active' : ''}`}
                            onClick={(event) => { event.persist(); this.props.handleForButtonClicked('diamond') }}>
                            <svg width="800px" height="800px" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                <title>diamond</title>
                                <g id="Layer_2" data-name="Layer 2">
                                    <g id="invisible_box" data-name="invisible box">
                                        <rect width="48" height="48" fill="none" />
                                    </g>
                                    <g id="Q3_icons" data-name="Q3 icons">
                                        <path d="M37,6H11L1.4,18.1,24,44,46.6,18.1ZM13.5,20l5.2,11.8L8.4,20Zm4.4,0H30.1L24,34Zm16.6,0h5.1L29.3,31.8ZM35,10l4.8,6H34l-3.1-6Zm-8.6,0,3.1,6h-11l3.1-6ZM13,10h4.1L14,16H8.2Z" />
                                    </g>
                                </g>
                            </svg>
                            <span>
                                Rarity
                            </span>
                        </a>

                        <a href="#" className={`headerButtons ${this.props.disableHeaderTabs && this.props.selectedButton !== 'price' ? 'disabled' : ''} ${this.props.selectedButton === 'price' ? 'active' : ''}`}
                            onClick={(event) => { event.persist(); this.props.handleForButtonClicked('price') }}>
                            <svg fill="#000000" width="24px" height="24px" viewBox="0 0 7.68 7.68" id="Flat" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.84 0.6a3.24 3.24 0 1 0 3.24 3.24A3.244 3.244 0 0 0 3.84 0.6Zm0 5.76a2.52 2.52 0 1 1 2.52 -2.52 2.523 2.523 0 0 1 -2.52 2.52Zm1.32 -1.92a0.961 0.961 0 0 1 -0.96 0.96v0.12a0.36 0.36 0 0 1 -0.72 0v-0.12h-0.36a0.36 0.36 0 0 1 0 -0.72h1.08a0.24 0.24 0 0 0 0 -0.48h-0.72a0.96 0.96 0 0 1 0 -1.92v-0.12a0.36 0.36 0 0 1 0.72 0v0.12h0.36a0.36 0.36 0 0 1 0 0.72h-1.08a0.24 0.24 0 0 0 0 0.48h0.72a0.961 0.961 0 0 1 0.96 0.96Z" />
                            </svg>
                            <span>
                                Prices
                            </span>
                        </a>

                        <a href="#" className={`headerButtons ${this.props.disableHeaderTabs && this.props.selectedButton !== 'speed' ? 'disabled' : ''} ${this.props.selectedButton === 'speed' ? 'active' : ''}`}
                            onClick={(event) => { event.persist(); this.props.handleForButtonClicked('speed') }}>
                            <svg className='speed-icon' width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2V4.5M12 2C6.47715 2 2 6.47715 2 12M12 2C17.5228 2 22 6.47715 22 12M12 19.5V22M12 22C17.5228 22 22 17.5228 22 12M12 22C6.47715 22 2 17.5228 2 12M4.5 12H2M22 12H19.5M19.0784 19.0784L17.3047 17.3047M4.92163 19.0784L6.69715 17.3029M4.92163 5L6.65808 6.73645M19.0784 5L13.4999 10.5M14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span>
                                Speed
                            </span>
                        </a>

                        <a href="#" className={`headerButtons ${this.props.disableHeaderTabs && this.props.selectedButton !== 'setting' ? 'disabled' : ''} ${this.props.selectedButton === 'setting' ? 'active' : ''}`}
                            onClick={(event) => { event.persist(); this.props.handleForButtonClicked('setting') }}>
                            <svg fill="#000000" width="800px" height="800px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M21.32,9.55l-1.89-.63.89-1.78A1,1,0,0,0,20.13,6L18,3.87a1,1,0,0,0-1.15-.19l-1.78.89-.63-1.89A1,1,0,0,0,13.5,2h-3a1,1,0,0,0-.95.68L8.92,4.57,7.14,3.68A1,1,0,0,0,6,3.87L3.87,6a1,1,0,0,0-.19,1.15l.89,1.78-1.89.63A1,1,0,0,0,2,10.5v3a1,1,0,0,0,.68.95l1.89.63-.89,1.78A1,1,0,0,0,3.87,18L6,20.13a1,1,0,0,0,1.15.19l1.78-.89.63,1.89a1,1,0,0,0,.95.68h3a1,1,0,0,0,.95-.68l.63-1.89,1.78.89A1,1,0,0,0,18,20.13L20.13,18a1,1,0,0,0,.19-1.15l-.89-1.78,1.89-.63A1,1,0,0,0,22,13.5v-3A1,1,0,0,0,21.32,9.55ZM20,12.78l-1.2.4A2,2,0,0,0,17.64,16l.57,1.14-1.1,1.1L16,17.64a2,2,0,0,0-2.79,1.16l-.4,1.2H11.22l-.4-1.2A2,2,0,0,0,8,17.64l-1.14.57-1.1-1.1L6.36,16A2,2,0,0,0,5.2,13.18L4,12.78V11.22l1.2-.4A2,2,0,0,0,6.36,8L5.79,6.89l1.1-1.1L8,6.36A2,2,0,0,0,10.82,5.2l.4-1.2h1.56l.4,1.2A2,2,0,0,0,16,6.36l1.14-.57,1.1,1.1L17.64,8a2,2,0,0,0,1.16,2.79l1.2.4ZM12,8a4,4,0,1,0,4,4A4,4,0,0,0,12,8Zm0,6a2,2,0,1,1,2-2A2,2,0,0,1,12,14Z" />
                            </svg>
                            <span>
                                Settings
                            </span>
                        </a>
                    </nav>
                </div>
            </div >
        )
    }
}