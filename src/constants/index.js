export const Statuses = {
  LOADING: 'loading',
  READY: 'ready',
  ALREADY_ACCEPTED: 'already_accepted',
  ERROR: 'error',
  ACCEPTED: 'accepted',
  REMOVED: 'removed',
  DECLINED: 'declined'
}
export const ConsentMode = {
  SIGNUP: 'SignUp',
  LOGIN: 'LogIn'
}
export const Languages = {
  ENGLISH: 'en',
  FRENCH: 'fr'
}
export const steps = [
  {
    title: 'About the Study',
    image: 'https://parkinsonmpower.org/static/images/about%20the%20study.svg',
    text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eu sagittis leo,
    sit amet consectetur mi. Donec volutpat rutrum massa et luctus.
    Fusce ac dui quam. Nam a nibh porttitor, tincidunt libero id, condimentum velit.
    Praesent ultricies consectetur nulla vel pharetra. Fusce auctor viverra fringilla.
    Duis euismod enim eu quam tincidunt, sed faucibus leo placerat.
    Pellentesque et justo a orci dictum pulvinar eleifend at nisl. Integer eu purus sapien.`
  },
  {
    title: 'How does the study work?',
    image:
      'https://parkinsonmpower.org/static/images/procedures%20activities.svg',
    text: `Integer vel diam a lorem mattis tristique at vel magna. Etiam nunc nunc,
    vehicula in mauris vel, gravida pellentesque leo. Lorem ipsum dolor sit amet,
    consectetur adipiscing elit. Quisque orci elit, mollis at massa non, tempor
    posuere turpis. Sed lacinia eros orci, quis efficitur justo euismod eget.
    In ornare vel nisi at fringilla.
    `
  },
  {
    title: 'How long does it last?',
    image:
      'https://parkinsonmpower.org/static/images/how%20long%20does%20it%20last.svg',
    text: `<p>We will ask you to participate for 2 weeks every three months.</p>
    <p>We would like you to participate for 2 years, but you can participate as long as you like.</p>`
  },
  {
    title: 'What are the benefits and risks?',
    image:
      'https://parkinsonmpower.org/static/images/benefits%20and%20risks.svg',
    text: `Integer vel diam a lorem mattis tristique at vel magna. Etiam nunc nunc,
    vehicula in mauris vel, gravida pellentesque leo. Lorem ipsum dolor sit amet,
    consectetur adipiscing elit. Quisque orci elit, mollis at massa non, tempor
    posuere turpis. Sed lacinia eros orci, quis efficitur justo euismod eget.
    In ornare vel nisi at fringilla.`
  }
]

export const fullConsentForm = {
  fullConsentForm: `
<div id="terms"><h4 style="text-align: center;">
UNIVERSITY OF SOMEWHERE
CONSENT FORM
</h4> <h5 style="text-align: center;">Crowdsourcing Image Segmentation</h5> <br> <h6>RESEARCHERS:</h6> <p>Someone Cool<br>
University of Somewhere eScience Institute and Institute for Neuroengineering<br> <a href="#">someone@us.edu</a></p> <p>Someone Nice<br>
University of Somewhere Institute for Neuroengineering<br> <a href="#">jjb@us.edu</a></p> <p>Someone Fun<br>
University of Somewhere eScience Institute<br> <a href="#">someone@us.edu</a></p> <h6>RESEARCHER’S STATEMENT:</h6> <p>  We are asking you to be in a research study.  The purpose of this consent form is to give you the information you will need to help you decide whether to be in the study or not.  Please read the form carefully.  You may ask questions about the purpose of the research, what we would ask you to do, the possible risks and benefits, your rights as a volunteer, and anything else about the research or this form that is not clear. Please reach out to a member of the Matter Lab if you have any questions. When we have answered all your questions, you can decide if you want to be in the study or not.  This process is called “informed consent.”
</p> <h6>PURPOSE OF THE STUDY</h6> <p>Image annotation is needed to extract data from images. The purpose of this study is to train better computer algorithms to annotate images, and also correct any errors the computer makes. We aim to 1) collect image annotation data from you, and 2) combine annotations from many users into the most accurate annotation. This information will be used to train new computer algorithms.
</p> <h6>STUDY PROCEDURES</h6> <p>You will be asked to log in. You may be given the option to use an existing social media login (e.g. Twitter, Facebook, Google, etc.), and you may be asked to create a an anonymous username to be displayed to the public. You may also choose to include your social media avatar to display alongside your anonymous username in the public leaderboard. Alternatively, you may also have the option to use an anonymous login. You may provide your email when you sign up for an account if you wish to be contacted about future work related to this task.</p> <p>You will be given instructions on how to annotate images for a particular task. Try your best to annotate the images as quickly and accurately as you can. You may complete however many tasks you wish. Each task can take anywhere from 30 seconds to 5 minutes. You may stop annotating at any time.
</p> <p>You may use any device with a web browser (computer, tablet, or phone). We will record all settings you use on the application, your annotations, your screen resolution, and your anonymous username. This data will be made publically available to researchers.
</p> <h6>RISKS, STRESS, OR DISCOMFORT</h6> <p>Some people feel that providing information for research or having the research session recorded is an invasion of privacy. If you wish to remain anonymous, we recommend creating an anonymous nickname that does not include any identifiers relating to you.
</p> <h6>BENEFITS OF THE STUDY</h6> <p>This study will help us to extract accurate data from images. This information will be used for scientific research.
</p> <h6>CONFIDENTIALITY OF RESEARCH INFORMATION</h6> <p>Your social media login information (such as username and email address), if provided, will remain confidential and will not be shared outside the study team.
Government or university staff sometimes review studies such as this one to make sure they are being done safely and legally.  If a review of this study takes place, your records may be examined.  The reviewers will protect your privacy.  The study records will not be used to put you at legal risk of harm.
</p> <h6>RESEARCH-RELATED INJURY</h6> <p>If you think you have been harmed from being in this research, contact Someone Cool at <a href="#">someone@us.edu.</a></p> <p>* Please note that we cannot ensure the confidentiality of information sent via e-mail.
</p> <h6>SUBJECT’S STATEMENT</h6> <p>This study has been explained to me, and I understand the procedures, benefits, and risks of this study.  I affirm that I am capable of consenting on my own behalf, that I am age 18 or older, and I volunteer to take part in this research.  I have had a chance to ask questions.  If I have questions later about the research, or if I have been harmed by participating in this study, I can contact one of the researchers listed on the first page of this consent form.  If I have questions about my rights as a research subject, I can call the Human Subjects Division.
</p></div>
`
}
