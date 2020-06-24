import React from 'react';

import './AlignCenter.css'

const userOutput = (props) => {
    return(
        <div>
        <p className='AlignCenter'>
            Username: {props.username}
        </p>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus cursus, libero viverra dapibus mattis, dui elit eleifend felis, quis tempor augue sem a sem. Aenean mollis arcu sed ipsum eleifend, vel mollis mi tristique. Aenean vel lorem ac tortor iaculis porttitor nec et felis. Quisque finibus justo velit, a molestie quam imperdiet viverra. Pellentesque blandit libero commodo orci iaculis dapibus. Etiam rutrum imperdiet risus. Ut mi arcu, eleifend vitae quam sit amet, elementum auctor sem. Suspendisse eget massa erat. Nullam imperdiet ultrices justo, vitae elementum magna blandit id. Nunc in auctor elit, vel vehicula eros. Vivamus imperdiet massa eget tellus iaculis pharetra. Praesent ac tincidunt massa. Maecenas eleifend a lorem ut placerat. Donec hendrerit pretium urna, sed placerat lectus sagittis at.
        </p>
        </div>
    )
};

export default userOutput;