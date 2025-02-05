import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { Link } from "react-router";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { TiSocialLinkedin } from "react-icons/ti";
import { Fade } from "react-awesome-reveal";

const Agents = () => {
  const axiosPublic = useAxiosPublic();

  // Fetch agents function
  const fetchAgents = async () => {
    const response = await axiosPublic.get("/agents");
    return response.data;
  };

  // React Query to fetch agents
  const {
    data: agents,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["agents"],
    queryFn: fetchAgents,
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-blue-500">Loading agents...</div>
      </div>
    );

  if (error)
    return (
      <div className="text-center text-red-500">
        Error fetching agents: {error.message}
      </div>
    );

  return (
    <Fade triggerOnce={true} delay={300}>
      <section className="bg-primaryColor">
        <div className="w-11/12 md:w-9/12 mx-auto  py-16 md:py-32">
          <div className="text-center pb-10 md:pb-20 w-11/12 md:w-5/12 mx-auto">
            <h3 className="text-3xl md:text-5xl font-light text-white mb-4 ">
              Our Agents
            </h3>
            <h4 className="text-white font-light text-lg">
              Discover How We’ve Made a Difference: Client Testimonials and
              Success Stories
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {agents.map((agent) => (
              <div
                key={agent.email}
                className="relative border border-[#e7e7e7]   flex flex-col items-center bg-white"
              >
                <img
                  src={agent.photo}
                  alt={agent.name}
                  className=" object-cover mb-4"
                />

                <div className="agent-info text-center">
                  <h3 className="text-lg font-medium">{agent.name}</h3>
                  <p className="text-xs mb-4">{agent.email}</p>
                </div>

                <div className="agent-social absolute top-1 right-1 flex flex-col space-y-2">
                  {agent.fbLink && (
                    <Link
                      to={agent.fbLink}
                      target="_blank"
                      className="bg-agentSocialBg text-white p-[6px] text-sm flex justify-center items-center"
                    >
                      <FaFacebookF />
                    </Link>
                  )}
                  {agent.twitterLink && (
                    <Link
                      to={agent.twitterLink}
                      target="_blank"
                      className="bg-agentSocialBg text-white p-1 text-sm flex justify-center items-center"
                    >
                      <FaTwitter />
                    </Link>
                  )}
                  {agent.linkedInLink && (
                    <Link
                      to={agent.linkedInLink}
                      target="_blank"
                      className="bg-agentSocialBg text-white p-1 text-sm flex justify-center items-center"
                    >
                      <TiSocialLinkedin />
                    </Link>
                  )}
                  {agent.instagramLink && (
                    <Link
                      to={agent.instagramLink}
                      target="_blank"
                      className="bg-agentSocialBg text-white p-1 text-sm flex justify-center items-center"
                    >
                      <FaInstagram />
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Fade>
  );
};

export default Agents;
