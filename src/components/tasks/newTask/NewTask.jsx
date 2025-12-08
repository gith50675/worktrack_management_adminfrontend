import React from 'react'

const NewTask = () => {
  return (
    <div>
        <div className="newtask-title">
            New Task
        </div>
    <div className="newtask-container">
        
        <div className="newtask-leftform">
            <form action="">
                <label htmlFor="">Task Name</label> <br />
                <input type="text" className='newtask-input'/>

                 {/* <label htmlFor="">Company Name</label> <br />
                  <input type="text" className='newproject-input'/> */}


                 <label htmlFor="">Description</label> <br />
                <textarea className='description'></textarea>
            </form>
        </div>

        <div className="newtask-rightform">
           <form action="">
                <label htmlFor=""> Assigned To</label> <br />
                <textarea className='newtask-input'></textarea>

                 <div className="date-hour">
                <div className="dates">
                  <label htmlFor="">Due Date</label> <br />
                  <input type="date" className='date' />
                </div>
                <div className="est-hour">
                   <label htmlFor="">Est.hour</label> <br />
                  <input type="text" className='esthour'  placeholder="00hr" />
                </div>
              </div>

              <div className="priority-link-task">
                <div className="task-priority">
                Prority
                </div>
                <div className="task-attachment-link">
                   <img src="Vector.svg" alt="" />
                </div>
                <div className="task-attachment-link">
                   <img src="link.svg" alt="" />
                
                </div>

              </div>

            </form>


        </div>
    </div>
    <div className="form-buttons">
  <button className="cancel-btn">Cancel</button>
  <button className="save-btn">Save</button>
</div>

    </div>
  )
}

export default NewTask