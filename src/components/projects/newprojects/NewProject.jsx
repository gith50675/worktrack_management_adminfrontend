import React from 'react'
import "./NewProject.css"

const NewProject = () => {
  return (
    <>
    <div className="newproject-title">
            New Project
        </div>
    <div className="newproject-container">
        
        <div className="newproject-leftform">
            <form action="">
                <label htmlFor="">Project Name</label> <br />
                <input type="text" className='newproject-input'/>

                 <label htmlFor="">Company Name</label> <br />
                  <input type="text" className='newproject-input'/>


                 <label htmlFor="">Description</label> <br />
                <textarea className='description'></textarea>
            </form>
        </div>

        <div className="newproject-rightform">
           <form action="">
                <label htmlFor="">Project Name</label> <br />
                <textarea className='newproject-input'></textarea>

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

              <div className="priority-link-project">
                <div className="project-priority">
                Prority
                </div>
                <div className="project-attachment-link">
                   <img src="Vector.svg" alt="" />
                </div>
                <div className="project-attachment-link">
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

    </>
  )
}

export default NewProject
