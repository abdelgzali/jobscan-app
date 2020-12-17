export const state = () => ({
  jobPosts: [],
  skills: [],
  selectedSkills: {},
});

export const mutations = {
  loadSkills(state, jobPosts) {
    if (jobPosts && jobPosts.length) {
      const skillsArr = [];
      // flatten array of skills
      // ['a,b,c','x,y,z'] ---> ['a','b','c','x','y','z']
      jobPosts.forEach((jobPost) => {
        skillsArr.push(...jobPost.skills.split(","));
      });
      // map skills, overwrite duplicates
      // takes an array pair of key/value,
      // keys represent a unique set of skills (case insensitive); value maintains case integrity for each unique skill
      // this ensures each string is unique, maintains case, while avoiding case sensitive duplicates
      const skillsMap = new Map(
        skillsArr.map((skill) => [skill.toLowerCase(), skill])
      );
      state.skills = [...skillsMap.values()];
    }
  },
  updateJobs(state, jobPosts, callback) {
    state.jobPosts = [...state.jobPosts, ...jobPosts];
    if (callback) callback();
  },
  updateSkills(state, skills) {
    state.skills = skills;
  },
  setSelectedSkill(state, { skill, rating }) {
    state.selectedSkills = { ...state.selectedSkills, [skill]: rating };
  },
  unsetSelectedSkill(state, skillName) {
    delete state.selectedSkills[skillName];
    state.selectedSkills = { ...state.selectedSkills };
  },
};
