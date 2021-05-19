import React from 'react'
import {Link} from 'react-router-dom'

function Setup() {
    return (
        <div>
            <h1>Set up your race</h1>
            <form>
                <label>Name Your Race
                    <input type="text" name="raceName" />
                </label>
                <label>Voting System
                    <select>
                        <option value="fibonacci">Fibonacci</option>
                    </select>
                </label>
                <Link to='/displayName'>
                    <input type="submit" value="Create Race" />
                </Link>
            </form>
        </div>
    )
}

export default Setup;
