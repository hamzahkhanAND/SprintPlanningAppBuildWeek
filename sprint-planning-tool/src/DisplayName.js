import React from 'react'

function DisplayName() {
    return (
        <div className="container mx-auto">
        <div className="flex items-center justify-center h-screen grid grid-cols-1">
            <form>
                <div className="my-9">
                    <label className="text-2xl md:text-3xl font-semibold">Choose your display name</label>
                </div>
                <div className="my-9">
                    <input type="text" name="displayName" placeholder="Display name" className="rounded p-3 border w-3/4 lg:w-1/4" />
                </div>
                <div className="my-9">
                    <input type="submit" value="Let the race begin" className="rounded-full bg-yellow-500 text-white text-2xl font-semibold py-3 px-9 w-3/4 lg:w-1/4" />
                </div>
            </form>
        </div>
        </div>
    )
}

export default DisplayName;
