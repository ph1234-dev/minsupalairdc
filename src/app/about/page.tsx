import React from 'react';
import Image from 'next/image';


const MARGIN_CARD_IMAGE_TIMELINE = 30

// --- Type Definitions ---
interface TimelineEventOthers {
  duration?: string;
  cost?: string;
  status?: 'In-progress' | 'Done'; // Status specifically for projects
}

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  imageUrl?: string;
  others?: TimelineEventOthers;
}

// --- Utility function to determine event status based STRICTLY on 'status' property or date for future events ---
const getEventStatus = (event: TimelineEvent): 'past' | 'in-progress' | 'future' | 'done' => {
  // 1. Check for explicit 'Done' status
  if (event.others?.status === 'Done') {
    return 'done';
  }

  // 2. Check for explicit 'In-progress' status
  if (event.others?.status === 'In-progress') {
    return 'in-progress';
  }

  // 3. If no specific status is set, check if the event date is in the future
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0); // Normalize current date to start of day
  const eventDate = new Date(event.date);
  eventDate.setHours(0, 0, 0, 0); // Normalize event date to start of day

  if (eventDate > currentDate) {
    return 'future';
  }

  // 4. Otherwise, it's a past event (default)
  return 'past';
};

// --- TimelineStatusIndicator Component ---
interface TimelineStatusIndicatorProps {
  status: 'In-progress' | 'Done';
}

const TimelineStatusIndicator: React.FC<TimelineStatusIndicatorProps> = ({ status }) => {
  if (status === 'In-progress') {
    return (
      <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
        <svg className="-ml-0.5 mr-1.5 h-2 w-2 text-yellow-400" fill="currentColor" viewBox="0 0 8 8">
          <circle cx="4" cy="4" r="3" />
        </svg>
        In Progress
      </span>
    );
  } else if (status === 'Done') {
    return (
      <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
        <svg className="-ml-0.5 mr-1.5 h-2 w-2 text-green-400" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
        Done
      </span>
    );
  }
  return null;
};

// --- Reusable TimelineEventDetails Component (nested) ---
interface TimelineEventDetailsProps extends TimelineEventOthers {}

const TimelineEventDetails: React.FC<TimelineEventDetailsProps> = ({ duration, cost }) => {
  if (!duration && !cost) {
    return null;
  }

  return (
    <div className="mt-4 text-sm text-gray-600">
      {duration && (
        <p className="flex items-center mb-1">
          <svg className="w-4 h-4 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l3 3a1 1 0 001.414-1.414L11 10.586V6z" clipRule="evenodd"></path>
          </svg>
          <span className="font-semibold">Duration:</span> {duration}
        </p>
      )}
      {cost && (
        <p className="flex items-center">
          <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2h4a2 2 0 002-2V6a2 2 0 00-2-2H4zm1.5 9.5A1.5 1.5 0 107 15h2.586l1.207 1.207a1 1 0 001.414-1.414L11.414 14H15a1 1 0 100-2h-3.586l-1.207-1.207a1 1 0 00-1.414 1.414L9.414 12H6a1 1 0 100 2h3.586l-1.207 1.207a1 1 0 00-1.414 1.414L6.586 14z" clipRule="evenodd"></path>
          </svg>
          <span className="font-semibold">Cost:</span> ₱{cost}
        </p>
      )}
    </div>
  );
};

// --- Main CreateTimeline Component ---

// Define the timeline events based on the provided text
const timelineEvents: TimelineEvent[] = [
  {
    date: 'June 1, 2023',
    title: 'Conceptualization of MinSuPala-IRDC',
    description: 'An exploratory meeting was held at the Greenleaf Hotel in General Santos City, led by Secretary Amenah F. Pangandaman of the Department of Budget and Management (DBM). Heads and representatives from various State Universities and Colleges (SUCs) discussed creating a united front to address regional challenges.',
    imageUrl: '/assets/resources/irdc-timeline/june-1-irdc-conceptualization-meeting.jpg'
  },
  {
    date: 'July 20, 2023',
    title: 'Official Launch & MOA Signing',
    description: 'Just 50 days after its conceptualization, the consortium was officially launched. The Memorandum of Agreement (MOA) for MinSuPala-IRDC members was formally signed, marking the official start of its mission to promote innovative research, support sustainable development, and strengthen research and extension capabilities.',
    imageUrl: '/assets/resources/irdc-timeline/july-21-2023.jpg'
  },
  {
    // This event is now marked as 'in-progress' in its 'others' property
    date: 'January 1, 2024', // Based on current date (May 2025), this is ongoing
    title:   'MINSUPALA IRDC Phase 1 Project: Assessment and Characterization of Water Quality. Inland Capture Fisheries, Watershed, and Socioeconomic of important Water Bodies for Social and Economic Transformation in Central Mindanao',
    description: 'The project aims to provide a comprehensive assessment and characterization of the important water bodies in Central Mindanao to gather scientific data and information. This management practice is for the sustainable development and transformation of the region. The project recognizes the intrinsic linkages between water quality, inland capture fisheries, watershed health, and socio-economic conditions, emphasizing the need to address these aspects holistically.',
    imageUrl: '/assets/resources/phase1-books/status-report-on-water-quality-inland-capture-fisheries-watersheds-and-socio-economic-conditions-of-important-water-bodies-in-central-mindanao.png',
    others: {
      duration: '12 Months',
      cost: '45,000,000.00',
      status: 'Done',
    }
  },{
    date: 'January 30, 2024',
    title: 'MINSUPALA-IRDC organized its first consortium meeting',
    description: "The meeting reaffirmed the initial agreement and discussed implementation strategies for the approved 45-million-peso research project titled 'Assessment and Characterization of Water Quality, Inland Capture Fisheries, Watershed, and Socio-Economic Aspects of Important Water Bodies for Social and Economic Transformation.' This project, a priority under the consortium’s Research and Development agenda, aims to optimize the use of Central Mindanao’s abundant natural water resources.",
    imageUrl: '/assets/resources/irdc-timeline/january-30-2024.jpg'
  },
  {
    date: 'November 13, 2024',
    title: 'Expansion: Six Additional SUCs Join',
    description: 'A historic milestone was recorded as six (6) additional SUCs formally joined the consortium. These newly inducted members signed the MOA in Davao City, expanding the consortium\'s reach and democratizing access to research opportunities for remote and historically marginalized academic institutions.',
    imageUrl: '/assets/resources/irdc-timeline/november-13-2024-New-Members-MOA.jpg'
  },
  {
    date: 'January 1, 2025', // This event is in the future
    title: 'MINSUPALA IRDC Phase 2 Project: Establishment and Preservation of Indigenous Fish and Crop Products',
    description: 'The project aims to conserve and promote indigenous crops and fish species unique to the region. This project aims to develop indigenous products while preserving traditional knowledge, biodiversity, and cultural heritage associated with these agricultural produce, while also creating market opportunities for local farmers .',
    imageUrl: '',
    others: {
      duration: '12 Months',
      cost: '45,000,000.00',
      status: 'In-progress',
    }
  },
];



const CreateTimeline: React.FC = () => {
  return (
    <section className="w-full py-16 bg-gray-50 ">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight sm:text-5xl">
            <span className="text-blue-700">MinSuPala-IRDC</span> Journey
          </h1>
          <h2 className="text-xl font-semibold text-gray-700 mb-6 max-w-2xl mx-auto">
            Uniting SUCs for a Better Mindanao, Sulu, and Palawan
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
            The Mindanao Sulu Palawan – Innovative Research and Development Consortium (MinSuPala-IRDC) came together with a shared purpose, addressing regional challenges through collaborative research and development efforts.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative wrap overflow-hidden p-0 md:p-10 h-full">
          {/* Vertical Line - Hidden on mobile, block on md and up */}
          <div className="border-2 absolute border-opacity-20 border-blue-700 h-full border left-1/2 transform -translate-x-1/2 hidden md:block"></div>

          {timelineEvents.map((event, index) => {
            const eventStatus = getEventStatus(event);
            const isFuture = eventStatus === 'future';
            const isInProgress = eventStatus === 'in-progress';
            const isDone = eventStatus === 'done';

            // Conditional styling based on status
            const cardOpacityClass = isFuture ? 'opacity-50 grayscale' : '';
            const cardHoverClass = !isFuture ? 'hover:shadow-xl hover:scale-105' : '';

            return (
              <div key={index} className={`mb-1 flex flex-col md:flex-row justify-between items-center w-full ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>

                {/* Content Card (Order first on mobile, then alternating) */}
                <div className={`order-2 md:order-1 bg-white rounded-lg md:shadow-lg w-full md:w-5/12 px-6 py-4 transition-all duration-300 ease-in-out mb-4 md:mb-${MARGIN_CARD_IMAGE_TIMELINE} ${cardOpacityClass} ${cardHoverClass}`}>
                  <h3 className="mb-2 font-bold text-gray-800 text-lg flex items-center">
                    {event.date}
                    {isInProgress && event.others?.status === 'In-progress' && (
                      <TimelineStatusIndicator status="In-progress" />
                    )}
                    {isDone && event.others?.status === 'Done' && (
                      <TimelineStatusIndicator status="Done" />
                    )}
                  </h3>
                  <h4 className="mb-2 font-semibold text-blue-700 text-xl">{event.title}</h4>
                  <p className="text-sm leading-snug tracking-wide text-gray-700 text-opacity-100 text-justify">{event.description}</p>

                  {/* Use the nested TimelineEventDetails component */}
                  {event.others && (
                    <TimelineEventDetails
                      duration={event.others.duration}
                      cost={event.others.cost}
                    />
                  )}
                </div>

                {/* Icon / Triangle - Hidden on mobile, flex on md and up */}
                <div className="z-10 hidden md:flex items-center justify-center order-1 bg-transparent w-8 h-8">
                  <svg className="w-8 h-8 text-blue-800" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    {/* Path for a downward-pointing triangle */}
                    <path d="M12 21L2 3h20z" />
                  </svg>
                </div>

                {/* Image Container (Order last on mobile, then alternating) */}
                <div className={`order-1 md:order-1 w-full md:w-5/12 mb-4 md:mb-${MARGIN_CARD_IMAGE_TIMELINE} ${cardOpacityClass}`}>
                  {event.imageUrl && (
                    <div className={`relative w-full h-48 md:h-90 `}>
                      <Image
                        src={event.imageUrl}
                        alt={event.title}
                        fill
                        className="object-contain"
                      />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};


export default CreateTimeline;