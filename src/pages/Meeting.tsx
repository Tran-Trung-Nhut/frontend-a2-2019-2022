import axios from "axios";
import { useEffect, useState } from "react";
import { defaultMeetingWithTimeDescription, MeetingWithTimeDescriptionDto } from "../dtos/meeting.dto";
import background from "../assets/backgroundHome.jpg";
import AcceptedUser from "../components/AcceptedUser";
import Loading from "../components/Loading";
import FeaturePopup from "../components/Feature";
import Forum from "../components/ForumPopup";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { dropDownHeaderState, userState } from "../state";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper/modules";
import MeetingCard from "../components/MeetingCard";
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import WhiteBorderButton from "../components/WhiteBorderButton";


export default function Meeting() {
    const [meetings, setMeetings] = useState<MeetingWithTimeDescriptionDto[]>([]);
    const [selectedMeeting, setSelectedMeeting] = useState<MeetingWithTimeDescriptionDto>(defaultMeetingWithTimeDescription);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [loading, setLoading] = useState<boolean>(true)
    const [showNewFeature, setShowNewFeature] = useState<boolean>(false)
    const [isShowForum, setIsShowForum] = useState<boolean>(false)
    const setDropdownOpen = useSetRecoilState(dropDownHeaderState)
    const user = useRecoilValue(userState)

    const fetchMeeting = async () => {
        try {
            const response = await axios.get('https://backend-a2-2019-2022.onrender.com/meeting');

            if (user.name !== '') {
                await axios.patch('https://backend-a2-2019-2022.onrender.com/user/lastAccess', {
                    name: user.name,
                })
            }

            setMeetings(response.data.data);
            setLoading(false)
        } catch (e) {
            console.log(e);
        }
    };

    const handleShowUser = async (meeting: MeetingWithTimeDescriptionDto) => {
        try {
            setSelectedMeeting(meeting),
                setIsPopupOpen(true)
        } catch (error) {
            alert("Có lỗi xảy ra vui lòng thử lại!")
        }
    }

    const handleShowForum = async (meeting: MeetingWithTimeDescriptionDto) => {
        try {
            setSelectedMeeting(meeting)
            setIsShowForum(true)
        } catch (error) {
            alert("Có lỗi xảy ra vui lòng thử lại!")
        }
    }

    useEffect(() => {
        fetchMeeting();
    }, []);

    return (
        <div className="relative min-h-screen overflow-hidden" onClick={() => setDropdownOpen(false)}>
            {isPopupOpen && (
                <AcceptedUser
                    onClose={() => setIsPopupOpen(false)}
                    meeting={selectedMeeting}
                />
            )}
            {loading && (
                <Loading />
            )}
            {showNewFeature && (
                <FeaturePopup onClose={() => setShowNewFeature(false)} />
            )}
            {isShowForum && (
                <Forum
                    onClose={() => setIsShowForum(false)}
                    meeting={selectedMeeting}
                />
            )}
            <div
                className="absolute inset-0 bg-cover bg-center filter blur-sm"
                style={{ backgroundImage: `url(${background})` }}
            ></div>
            <div className="my-5 flex justify-center items-center">
                <WhiteBorderButton 
                showSomething={setShowNewFeature} 
                name="Tạo cuộc họp mới" />
            </div>
            <div className="relative mb-5">
                <Swiper
                    effect="coverflow"
                    grabCursor={false}
                    centeredSlides={true}
                    spaceBetween={-50}
                    hidden={true}
                    coverflowEffect={{
                        rotate: 50,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows: false,
                    }}
                    pagination={{ clickable: true }}
                    breakpoints={{
                        640: {
                            slidesPerView: 3,
                        },
                        0: {
                            slidesPerView: 1,
                        },
                    }}
                    modules={[EffectCoverflow, Pagination]}
                >
                    {meetings.map((meeting) => (
                        <SwiperSlide 
                        key={meeting.id} 
                        className="">
                            <MeetingCard 
                            meeting={meeting} 
                            handleShowForum={handleShowForum} 
                            handleShowUser={handleShowUser} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
}
