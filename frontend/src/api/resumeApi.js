import api from './axios';

export const uploadResume = (file) => {

  const form = new FormData();
  form.append("resume_file",file);
  form.append("title",file.name);

  return api.post("/resumes/upload/",form,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );
};

export const getResumes = () => {
  return api.get("/resumes/list/");
}

export const getResume = (id) => {
  return api.get(`/resumes/${id}/`);
};