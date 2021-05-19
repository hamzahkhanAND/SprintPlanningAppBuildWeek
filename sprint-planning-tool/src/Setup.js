import React from 'react'

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
                <input type="submit" value="Create Race" />
            </form>
        </div>
    )
}

export default Setup;
