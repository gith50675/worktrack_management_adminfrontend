import React from 'react'
import "./ProjectDetail.css"

const ProjectDetail = () => {
  return (
    <div>
        <div className="project-detail-title">
            Project Details
        </div>
    <div className="project-detail-container">
        
        <div className="project-detail-leftform">
            <form action="">
                <label htmlFor="">Project Name</label> <br />
                <input type="text" className='project-detail-input'/>

                 <label htmlFor="">Company Name</label> <br />
                  <input type="text" className='project-detail-input'/>


                 <label htmlFor="">Description</label> <br />
                <textarea className='description'></textarea>
            </form>
        </div>

        <div className="project-detail-rightform">
           <form action="">
                <label htmlFor="">Assigned to</label> <br />
                <textarea className='project-detail-input'></textarea>

                 <div className="date-hour">
                
                <div className="est-hour">
                   <label htmlFor="">Priority</label> <br />
                  <input type="text" className='esthour' />
                </div>
                <div className="dates">
                  <label htmlFor="">Due Date</label> <br />
                  <input type="date" className='date' />
                </div>
              </div>

              <div className="link-project">
                
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
       
      
    </div>
  )
}

export default ProjectDetail
