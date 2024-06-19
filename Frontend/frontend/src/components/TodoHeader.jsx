function TodoHeader(props) {
    const today = new Date()
    const formatDate = (today) => {
      return `${today.toLocaleDateString('en-UK', { weekday: 'long' })}, ${today.toLocaleDateString(
        'en-UK',
        {
          day: 'numeric',
          month: 'long',
        },
      )} 🌤️`
    }
    
    return (

        <>
            <div className="todo-box">
                <div className="todo-div">
                    <h1 style={{ padding: '10px 0px' }}>{formatDate(today)}</h1>
                    <h2 style={{ paddingBottom: '5px' }}>
                        Hey there! What's the plan for today?
                    </h2>
                </div>
            </div>
        </>
    )
}

export default TodoHeader