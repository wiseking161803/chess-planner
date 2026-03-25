/**
 * Chess Training Planner — Schedule Data
 * Extensible structure: add phases/weeks/slots freely
 */

const TRAINING_CONFIG = {
  startDate: '2026-03-20', // Friday → first real training day is Sat 21
  playerInfo: {
    name: 'Chess Warrior',
    startElo: 1800,
    targetElo: 2500,
    shortTermTarget: 2000,
    fideId: '12403938',
    startWeight: 82,
    targetWeight: 73,
    height: 171,
    tournament: 'ASEAN Age Group U2000 — Singapore, August 2026',
    ultimateGoal: 'Grandmaster — March 2032'
  },

  // ═══════════════════════════════════════════
  // PHASES — Add more phases to extend the plan
  // ═══════════════════════════════════════════
  phases: [
    {
      id: 1,
      name: 'Foundation',
      subtitle: 'Xây Nền Tảng',
      weekStart: 1,
      weekEnd: 5,
      eloTarget: 1850,
      color: '#4CAF50',
      icon: '🏗️',
      focus: [
        'Tàn cuộc cơ bản — 100 Endgames You Must Know',
        'Khai cuộc main lines trên Chessable',
        'Chiến thuật 100-150 bài/tuần (KCT)',
        'Đấu 6-8 ván slow/tuần, phân tích 100%'
      ],
      materials: {
        opening: 'Học main lines: Reti (Trắng), Scandinavian & Dutch Leningrad (Đen) — GM Arturs Neiksans trên Chessable',
        middlegame: 'U2000 Foundation of Positional Play (KCT) — Bắt đầu',
        endgame: '100 Endgames You Must Know (de la Villa) — Hoàn thành toàn bộ',
        tactics: '100-150 bài/tuần trên Killer Chess Training',
        vods: 'Ván mẫu GM minh họa cấu trúc tốt cơ bản'
      }
    },
    {
      id: 2,
      name: 'Building',
      subtitle: 'Phát Triển',
      weekStart: 6,
      weekEnd: 10,
      eloTarget: 1900,
      color: '#2196F3',
      icon: '📈',
      focus: [
        'Sidelines khai cuộc + Spaced Repetition',
        'Chess Structures — liên kết khai cuộc với trung cuộc',
        'Chiến thuật 150 bài/tuần, độ khó tăng',
        'Tham gia giải mở rộng'
      ],
      materials: {
        opening: 'Sidelines + biến phụ, Spaced Repetition trên Chessable',
        middlegame: 'Hoàn thành KCT + Chess Structures (Flores Rios)',
        endgame: "Silman's Complete Endgame Course — chương U2000",
        tactics: '150 bài/tuần trên KCT, tăng độ khó',
        vods: 'Phân tích ván GM chuyên sâu về positional play'
      }
    },
    {
      id: 3,
      name: 'Sharpening',
      subtitle: 'Mài Sắc',
      weekStart: 11,
      weekEnd: 15,
      eloTarget: 1950,
      color: '#FF9800',
      icon: '⚔️',
      focus: [
        'Chessable Spaced Rep hàng ngày',
        'Endgame Strategy nâng cao (Shereshevsky)',
        'Chiến thuật 150+ bài/tuần, calculation depth',
        'Giải quốc gia + prep đối thủ'
      ],
      materials: {
        opening: 'Chessable Spaced Rep hàng ngày, phân tích ván thực chiến',
        middlegame: 'Chess Structures hoàn thành + ván mẫu GM nâng cao',
        endgame: 'Endgame Strategy (Shereshevsky) — chọn lọc chương quan trọng',
        tactics: '150+ bài/tuần, focus sâu vào calculation 3-5 nước',
        vods: 'Ván mẫu: Karpov, Carlsen — positional mastery'
      }
    },
    {
      id: 4,
      name: 'Peak & Taper',
      subtitle: 'Đỉnh Cao',
      weekStart: 16,
      weekEnd: 20,
      eloTarget: 2000,
      color: '#E91E63',
      icon: '🏆',
      focus: [
        'Ôn tập toàn bộ + prep đối thủ ASEAN Age Group',
        'Ôn lại 100 Endgames You Must Know',
        'Chiến thuật duy trì 100 bài/tuần',
        'Giảm tải 2 tuần cuối — tâm lý thi đấu'
      ],
      materials: {
        opening: 'Chỉ ôn tập + prep specific đối thủ ASEAN Age Group Singapore',
        middlegame: 'Ôn tập notes, xem lại key positions',
        endgame: 'Ôn lại 100 Endgames + practical endgame drills',
        tactics: 'Duy trì 100 bài/tuần, giữ phong độ',
        vods: 'Xem lại ván đấu của chính mình, rút kinh nghiệm'
      }
    },
    {
      id: 5, name: 'Consolidation', subtitle: 'Củng Cố 2100',
      dateStart: '2026-09-01', dateEnd: '2027-08-31',
      eloTarget: 2100, color: '#7C4DFF', icon: '🔮',
      focus: [
        'Woodpecker Method — tactical pattern mastery',
        'Tal-Botvinnik 1960 & My 60 Memorable Games',
        'Mastering Chess Strategy (Hellsten)',
        'Endgame Virtuoso (Smyslov) + Mastering Endgame Strategy',
        'Giải đấu FIDE rated thường xuyên'
      ],
      materials: {
        opening: 'Mở rộng repertoire, thêm 1-2 hệ thống mới. Deep theory cho main lines.',
        middlegame: 'Mastering Chess Strategy + Seven Deadly Chess Sins. Positional decision making.',
        endgame: 'Endgame Virtuoso (Smyslov) + Mastering Endgame Strategy (Hellsten).',
        tactics: 'Woodpecker Method + Excelling at Combinational Play (Aagaard). 30+ bài/ngày.',
        vods: 'My 60 Memorable Games (Fischer). Tal-Botvinnik 1960. Chess Calculation Training.'
      }
    },
    {
      id: 6, name: 'Advanced Strategy', subtitle: 'Chiến Lược Cao Cấp 2200',
      dateStart: '2027-09-01', dateEnd: '2028-08-31',
      eloTarget: 2200, color: '#00BFA5', icon: '🧠',
      focus: [
        'Dvoretsky School of Chess Excellence (Tactical Play)',
        'Strategic Chess Exercises (Bricard)',
        'Chess Structures deep study',
        'Cognitive Chess + Perfect Your Chess',
        'FM/IM norm tournaments'
      ],
      materials: {
        opening: 'Deep repertoire. Anti-systems và sidelines nâng cao. Novelty preparation.',
        middlegame: 'Strategic Chess Exercises + Secrets of Grandmaster Chess (Nunn). Life & Games of Tal.',
        endgame: '100 Endgames — complete mastery. Endgame Virtuoso advanced.',
        tactics: 'Excelling at Combinational Play 2 + Cognitive Chess + Dvoretsky Tactical Play.',
        vods: 'Perfect Your Chess (Volokitin). Think Like a Super-GM.'
      }
    },
    {
      id: 7, name: 'Expert Mastery', subtitle: 'Chuyên Gia 2350',
      dateStart: '2028-09-01', dateEnd: '2030-02-28',
      eloTarget: 2350, color: '#FF6D00', icon: '🏅',
      focus: [
        'Grandmaster Preparation: Calculation (Aagaard)',
        'Fire on Board (Shirov) & Positional Decision Making (Gelfand)',
        'Dvoretsky Endgame Manual',
        'Rook Endings (Levenfish & Smyslov)',
        'IM norm hunting'
      ],
      materials: {
        opening: 'Repertoire updates liên tục. Novelty research. Anti-prep strategies.',
        middlegame: 'Positional Decision Making (Gelfand). Kramnik: My Life & Games. Test of Time (Kasparov).',
        endgame: 'Dvoretsky Endgame Manual + Rook Endings + Practical Rook Endgames (Korchnoi).',
        tactics: 'GM Preparation: Calculation + Turbo-Charge Your Tactics + Imagination in Chess.',
        vods: 'Fire on Board (Shirov). The Best Move (Hort). Sam Shankland — Calculation!'
      }
    },
    {
      id: 8, name: 'GM Preparation', subtitle: 'Chuẩn Bị GM 2500',
      dateStart: '2030-03-01', dateEnd: '2032-03-31',
      eloTarget: 2500, color: '#FFD600', icon: '👑',
      focus: [
        'My Great Predecessors (Kasparov) — 5 tập',
        'Advanced Chess Tactics (Psakhis)',
        'Dvoretsky Strategic Play & full manual series',
        'GM norm tournaments — minimum 3 norms',
        'Professional coaching với GM'
      ],
      materials: {
        opening: 'Engine-assisted preparation. Novelty research chuyên sâu. Second preparation.',
        middlegame: 'My Great Predecessors (Kasparov). Alekhine Best Games. Deep strategic themes.',
        endgame: 'Dvoretsky Endgame Manual — complete. Endgame Tactics (van Perlo). Rook Endings mastery.',
        tactics: 'Advanced Chess Tactics (Psakhis). Recognizing Opponent Resources (Dvoretsky).',
        vods: 'Top GM game analysis. Self-analysis với IM/GM coach.'
      }
    }
  ],

  // ═══════════════════════════════════════════
  // WEEKLY SCHEDULE — 0=Sunday ... 6=Saturday
  // ═══════════════════════════════════════════
  weeklySchedule: {
    1: { // Monday
      name: 'Thứ 2',
      isRest: false,
      slots: [
        {
          id: 'mon-2',
          time: '05:00',
          endTime: '08:00',
          type: 'opening',
          icon: '♟️',
          title: 'Khai cuộc',
          duration: '3h',
          phaseContent: {
            1: 'Học main lines: Reti (Trắng), Scandinavian & Dutch Leningrad (Đen) trên Chessable. Focus hiểu ý tưởng, không chỉ thuộc lòng.',
            2: 'Sidelines + biến phụ. Bắt đầu Spaced Repetition trên Chessable cho các biến đã học.',
            3: 'Chessable Spaced Rep. Phân tích các ván thực chiến gặp khai cuộc của mình.',
            4: 'Ôn tập nhẹ + prep specific opponents cho giải ASEAN Age Group.'
          }
        },
        {
          id: 'mon-3',
          time: '09:00',
          endTime: '09:30',
          type: 'meal',
          icon: '🍳',
          title: 'Bữa sáng',
          description: 'Yến mạch + trứng + rau xanh (~500kcal). IF window mở.'
        },
        {
          id: 'mon-4',
          time: '09:30',
          endTime: '12:00',
          type: 'tactics',
          icon: '🧩',
          title: 'Bài tập chiến thuật',
          duration: '2.5h',
          phaseContent: {
            1: 'KCT: 20-25 bài/ngày. Focus pattern recognition cơ bản: pins, forks, discovered attacks, skewers.',
            2: 'KCT: 25-30 bài/ngày. Tăng độ khó, thêm combinations 2-3 nước.',
            3: 'KCT: 30+ bài/ngày. Calculation depth 3-5 nước. Thêm bài tập blindfold.',
            4: 'KCT: 20 bài/ngày. Duy trì phong độ, không ép quá nhiều.'
          }
        },
        {
          id: 'mon-5',
          time: '12:00',
          endTime: '13:00',
          type: 'rest',
          icon: '😴',
          title: 'Nghỉ trưa',
          description: 'Chợp mắt 30 phút. Không dùng điện thoại trước khi ngủ.'
        },
        {
          id: 'mon-6',
          time: '13:00',
          endTime: '13:30',
          type: 'meal',
          icon: '🍚',
          title: 'Bữa trưa',
          description: 'Cơm gạo lứt + ức gà/cá + rau nhiều (~700kcal). Protein ≥40g.'
        },
        {
          id: 'mon-7',
          time: '13:30',
          endTime: '15:00',
          type: 'endgame',
          icon: '♟️',
          title: 'Tàn cuộc',
          duration: '1.5h',
          phaseContent: {
            1: '100 Endgames You Must Know — học 2-3 endgame mới/ngày. Luyện trên board.',
            2: "Silman's Complete Endgame Course — chương Class B/A (U2000).",
            3: 'Endgame Strategy (Shereshevsky) — chọn lọc: technique, pawn endings.',
            4: 'Ôn lại 100 Endgames. Practice endgame positions trên Lichess.'
          }
        },
        {
          id: 'mon-8',
          time: '15:00',
          endTime: '16:30',
          type: 'play',
          icon: '⚔️',
          title: 'Đấu cờ & Phân tích',
          duration: '1.5h',
          phaseContent: {
            1: '1-2 ván 15+10 trên Lichess. Phân tích với engine sau mỗi ván. Ghi chú sai lầm.',
            2: '2 ván 15+10 hoặc 1 ván 30+0. Focus positional decisions, không chỉ tactics.',
            3: '1-2 ván 15+10. Phân tích sâu: opening prep accuracy, critical moments.',
            4: '1 ván 30+0 hoặc 15+10. Simulate tournament conditions: clock management.'
          }
        },
        {
          id: 'mon-9',
          time: '16:30',
          endTime: '17:00',
          type: 'meal',
          icon: '🍽️',
          title: 'Bữa tối',
          description: 'Salad protein + khoai lang (~600kcal). IF window đóng sau bữa này.'
        },
        {
          id: 'mon-10',
          time: '17:00',
          endTime: '19:00',
          type: 'teaching',
          icon: '👨‍🏫',
          title: 'Dạy cờ',
          description: 'Trung tâm tỉnh. Dạy cũng là học — quan sát lỗi phổ biến của học sinh.'
        },
        {
          id: 'mon-11',
          time: '21:00',
          endTime: '22:00',
          type: 'exercise',
          icon: '🏃',
          title: 'Chạy bộ Zone 2 (45p) + Stretching',
          description: 'Cardio giảm cân, HR 120-140bpm. 15 phút stretching sau chạy.'
        }
      ]
    },

    2: { // Tuesday
      name: 'Thứ 3',
      isRest: false,
      slots: [
        {
          id: 'tue-2',
          time: '05:00',
          endTime: '08:00',
          type: 'middlegame',
          icon: '♟️',
          title: 'Trung cuộc — Thế trận',
          duration: '3h',
          phaseContent: {
            1: 'U2000 Foundation of Positional Play (KCT). Học concepts: weak squares, outposts, pawn structure.',
            2: 'Tiếp tục KCT + bắt đầu Chess Structures. Liên kết cấu trúc tốt với khai cuộc của mình.',
            3: 'Chess Structures chuyên sâu. Nghiên cứu cấu trúc từ Reti, Scandinavian, Dutch.',
            4: 'Ôn tập key concepts. Review notes từ các tuần trước.'
          }
        },
        {
          id: 'tue-3',
          time: '09:00',
          endTime: '09:30',
          type: 'meal',
          icon: '🍳',
          title: 'Bữa sáng',
          description: 'Yến mạch + trứng + rau xanh (~500kcal).'
        },
        {
          id: 'tue-4',
          time: '09:30',
          endTime: '12:00',
          type: 'study',
          icon: '📺',
          title: 'VODs / Ván mẫu GM',
          duration: '2.5h',
          phaseContent: {
            1: 'Xem ván mẫu GM minh họa concepts đang học. Pause và đoán nước đi.',
            2: 'Phân tích ván GM chuyên sâu về positional play. Ghi chú key positions.',
            3: 'Ván mẫu Karpov, Carlsen. Focus: prophylactic thinking, long-term planning.',
            4: 'Xem lại ván đấu của mình. Tổng kết patterns, mistakes, improvements.'
          }
        },
        {
          id: 'tue-5',
          time: '12:00',
          endTime: '13:00',
          type: 'rest',
          icon: '😴',
          title: 'Nghỉ trưa',
          description: 'Chợp mắt 30 phút.'
        },
        {
          id: 'tue-6',
          time: '13:00',
          endTime: '13:30',
          type: 'meal',
          icon: '🍚',
          title: 'Bữa trưa',
          description: 'Cơm gạo lứt + protein + rau (~700kcal).'
        },
        {
          id: 'tue-7',
          time: '13:30',
          endTime: '15:00',
          type: 'teaching',
          icon: '👨‍🏫',
          title: 'Dạy cờ',
          description: 'Trung tâm tỉnh.'
        },
        {
          id: 'tue-8',
          time: '15:00',
          endTime: '16:00',
          type: 'tactics',
          icon: '🧩',
          title: 'Bài tập chiến thuật',
          duration: '1h',
          phaseContent: {
            1: 'KCT: Focus pattern recognition. 15-20 bài.',
            2: 'KCT: Combinations + tăng độ khó. 20 bài.',
            3: 'KCT: Deep calculation. 20+ bài.',
            4: 'KCT: Duy trì 15 bài/ngày.'
          }
        },
        {
          id: 'tue-11',
          time: '16:00',
          endTime: '17:00',
          type: 'exercise',
          icon: '💪',
          title: 'Dumbbell Upper Body (50p) + Stretch',
          description: 'Chest press, rows, shoulder press, bicep curls, tricep extensions. 3 sets x 12 reps.'
        },
        {
          id: 'tue-9',
          time: '17:00',
          endTime: '17:30',
          type: 'meal',
          icon: '🍽️',
          title: 'Bữa tối',
          description: 'Salad protein + khoai lang (~600kcal). IF window đóng.'
        },
        {
          id: 'tue-10',
          time: '17:30',
          endTime: '19:30',
          type: 'opening',
          icon: '♟️',
          title: 'Khai cuộc',
          duration: '2h',
          phaseContent: {
            1: 'Chessable: Review các biến đã học sáng. Spaced repetition tối.',
            2: 'Chessable: Sidelines và tricky lines. Anti-systems.',
            3: 'Review + phân tích ván thực chiến liên quan khai cuộc.',
            4: 'Prep đối thủ cụ thể.'
          }
        }
      ]
    },

    3: { // Wednesday
      name: 'Thứ 4',
      isRest: false,
      slots: [
        {
          id: 'wed-2',
          time: '05:00',
          endTime: '08:00',
          type: 'play',
          icon: '⚔️',
          title: 'Đấu cờ thực chiến & Phân tích',
          duration: '3h',
          phaseContent: {
            1: '2-3 ván 15+10. Phân tích ngay sau mỗi ván với Stockfish. Ghi chú critical moments.',
            2: '2 ván 30+0 hoặc 3 ván 15+10. Focus: áp dụng concepts từ Thứ 3.',
            3: '2 ván 30+0. Deep analysis. So sánh với prep khai cuộc.',
            4: '1-2 ván 30+0. Tournament simulation: manage clock, stay focused.'
          }
        },
        {
          id: 'wed-3',
          time: '09:00',
          endTime: '09:30',
          type: 'meal',
          icon: '🍳',
          title: 'Bữa sáng',
          description: 'Yến mạch + trứng + rau (~500kcal).'
        },
        {
          id: 'wed-4',
          time: '09:30',
          endTime: '12:00',
          type: 'endgame',
          icon: '♟️',
          title: 'Tàn cuộc',
          duration: '2.5h',
          phaseContent: {
            1: '100 Endgames: Pawn endings, Rook endings cơ bản. Luyện positions trên board.',
            2: "Silman's: Complex endings. R+P, B vs N, opposite colored bishops.",
            3: 'Shereshevsky: Strategy in endgame. Transition from middlegame.',
            4: 'Ôn lại critical endgames. Practice drills.'
          }
        },
        {
          id: 'wed-5',
          time: '12:00',
          endTime: '13:00',
          type: 'rest',
          icon: '😴',
          title: 'Nghỉ trưa',
          description: 'Chợp mắt 30 phút.'
        },
        {
          id: 'wed-6',
          time: '13:00',
          endTime: '13:30',
          type: 'meal',
          icon: '🍚',
          title: 'Bữa trưa',
          description: 'Cơm gạo lứt + protein + rau (~700kcal).'
        },
        {
          id: 'wed-7',
          time: '13:30',
          endTime: '16:30',
          type: 'teaching',
          icon: '👨‍🏫',
          title: 'Dạy cờ',
          description: 'Trung tâm tỉnh (buổi chiều dài).'
        },
        {
          id: 'wed-8',
          time: '16:30',
          endTime: '17:00',
          type: 'meal',
          icon: '🍽️',
          title: 'Bữa tối',
          description: 'Salad protein + khoai lang (~600kcal). IF window đóng.'
        },
        {
          id: 'wed-9',
          time: '17:00',
          endTime: '19:00',
          type: 'teaching',
          icon: '👨‍🏫',
          title: 'Dạy cờ',
          description: 'Trung tâm tỉnh (buổi tối).'
        },
        {
          id: 'wed-10',
          time: '21:00',
          endTime: '22:00',
          type: 'exercise',
          icon: '🏃',
          title: 'Chạy bộ Zone 2 (45p) + Stretching',
          description: 'Cardio, HR 120-140bpm. 15 phút stretching.'
        }
      ]
    },

    4: { // Thursday
      name: 'Thứ 5',
      isRest: false,
      slots: [
        {
          id: 'thu-2',
          time: '05:00',
          endTime: '08:00',
          type: 'middlegame',
          icon: '♟️',
          title: 'Trung cuộc — Thế trận',
          duration: '3h',
          phaseContent: {
            1: 'KCT: Positional concepts. Weak squares, pawn chains, piece activity.',
            2: 'Chess Structures: Cấu trúc tốt từ khai cuộc Reti / Scandinavian / Dutch.',
            3: 'Advanced positional themes. Prophylaxis, positional sacrifices.',
            4: 'Ôn tập. Xem lại notes, key positions.'
          }
        },
        {
          id: 'thu-3',
          time: '09:00',
          endTime: '09:30',
          type: 'meal',
          icon: '🍳',
          title: 'Bữa sáng',
          description: 'Yến mạch + trứng + rau (~500kcal).'
        },
        {
          id: 'thu-4',
          time: '09:30',
          endTime: '12:00',
          type: 'study',
          icon: '📺',
          title: 'VODs / Ván mẫu',
          duration: '2.5h',
          phaseContent: {
            1: 'Ván mẫu GM minh họa endgame technique + middlegame plans.',
            2: 'Phân tích ván GM: focus transition middlegame → endgame.',
            3: 'High-level ván mẫu. Think along, compare your analysis.',
            4: 'Review ván mình đã đấu. Patterns & improvements.'
          }
        },
        {
          id: 'thu-5',
          time: '12:00',
          endTime: '13:00',
          type: 'rest',
          icon: '😴',
          title: 'Nghỉ trưa',
          description: 'Chợp mắt 30 phút.'
        },
        {
          id: 'thu-6',
          time: '13:00',
          endTime: '13:30',
          type: 'meal',
          icon: '🍚',
          title: 'Bữa trưa',
          description: 'Cơm gạo lứt + protein + rau (~700kcal).'
        },
        {
          id: 'thu-7',
          time: '13:30',
          endTime: '15:00',
          type: 'opening',
          icon: '♟️',
          title: 'Khai cuộc',
          duration: '1.5h',
          phaseContent: {
            1: 'Chessable Spaced Rep. Ôn lại các biến đã học.',
            2: 'Focus sidelines: Anti-Scandinavian, Anti-Dutch systems.',
            3: 'Review + analysis ván thực chiến.',
            4: 'Prep đối thủ ASEAN Age Group.'
          }
        },
        {
          id: 'thu-8',
          time: '15:00',
          endTime: '16:00',
          type: 'tactics',
          icon: '🧩',
          title: 'Bài tập chiến thuật',
          duration: '1h',
          phaseContent: {
            1: 'KCT: 15-20 bài. Mix themes.',
            2: 'KCT: 20 bài. Harder puzzles.',
            3: 'KCT: 20+ bài. Deep calculation practice.',
            4: 'KCT: 15 bài. Maintain sharpness.'
          }
        },
        {
          id: 'thu-11',
          time: '16:00',
          endTime: '17:00',
          type: 'exercise',
          icon: '💪',
          title: 'Dumbbell Lower Body (50p) + Stretch',
          description: 'Goblet squats, lunges, RDL, calf raises. 3 sets x 12-15 reps.'
        },
        {
          id: 'thu-9',
          time: '17:00',
          endTime: '17:30',
          type: 'meal',
          icon: '🍽️',
          title: 'Bữa tối',
          description: 'Salad protein (~600kcal). IF window đóng.'
        },
        {
          id: 'thu-10',
          time: '17:30',
          endTime: '19:30',
          type: 'endgame',
          icon: '♟️',
          title: 'Tàn cuộc',
          duration: '2h',
          phaseContent: {
            1: '100 Endgames: Review + practice positions.',
            2: "Silman's: Practical exercises.",
            3: 'Shereshevsky: Complex endgame strategy.',
            4: 'Ôn tập tàn cuộc quan trọng nhất.'
          }
        }
      ]
    },

    5: { // Friday
      name: 'Thứ 6',
      isRest: true,
      restMessage: '🟢 Nghỉ ngơi — Hồi phục năng lượng. Đi bộ nhẹ 30 phút nếu muốn. Không cờ!',
      slots: [
        {
          id: 'fri-1',
          time: '07:00',
          endTime: '07:30',
          type: 'exercise',
          icon: '🚶',
          title: 'Đi bộ nhẹ (optional)',
          description: '30 phút đi bộ thư giãn. Không bắt buộc.'
        },
        {
          id: 'fri-2',
          time: '09:00',
          endTime: '09:30',
          type: 'meal',
          icon: '🍳',
          title: 'Bữa sáng',
          description: 'Ăn uống thoải mái hơn nhưng vẫn healthy.'
        },
        {
          id: 'fri-3',
          time: '13:00',
          endTime: '13:30',
          type: 'meal',
          icon: '🍚',
          title: 'Bữa trưa',
          description: 'Ăn tự do.'
        },
        {
          id: 'fri-4',
          time: '16:30',
          endTime: '17:00',
          type: 'meal',
          icon: '🍽️',
          title: 'Bữa tối',
          description: 'IF window đóng.'
        }
      ]
    },

    6: { // Saturday
      name: 'Thứ 7',
      isRest: false,
      slots: [
        {
          id: 'sat-2',
          time: '05:00',
          endTime: '08:00',
          type: 'play',
          icon: '⚔️',
          title: 'Đấu cờ / Giải đấu',
          duration: '3h',
          phaseContent: {
            1: 'Đấu online 15+10. Ghi lại ván để phân tích.',
            2: 'Tham gia giải mở rộng hoặc đấu rated online.',
            3: 'Giải quốc gia / giải mở rộng. Serious games.',
            4: 'Tournament simulation. Clock management practice.'
          }
        },
        {
          id: 'sat-3',
          time: '09:00',
          endTime: '09:30',
          type: 'meal',
          icon: '🍳',
          title: 'Bữa sáng',
          description: 'Yến mạch + trứng + rau (~500kcal).'
        },
        {
          id: 'sat-4',
          time: '09:30',
          endTime: '12:00',
          type: 'tactics',
          icon: '🧩',
          title: 'Bài tập chuyên sâu',
          duration: '2.5h',
          phaseContent: {
            1: 'Complex tactics: multi-move combinations. 25+ bài.',
            2: 'Hard puzzles. Calculation training. 25+ bài.',
            3: 'Tournament-level puzzles. 30+ bài. Time pressure practice.',
            4: 'Mixed difficulty. Maintain sharpness.'
          }
        },
        {
          id: 'sat-5',
          time: '12:00',
          endTime: '13:00',
          type: 'rest',
          icon: '😴',
          title: 'Nghỉ trưa',
          description: 'Chợp mắt 30 phút.'
        },
        {
          id: 'sat-6',
          time: '13:00',
          endTime: '13:30',
          type: 'meal',
          icon: '🍚',
          title: 'Bữa trưa',
          description: 'Cơm gạo lứt + protein + rau (~700kcal).'
        },
        {
          id: 'sat-7',
          time: '13:30',
          endTime: '15:00',
          type: 'opening',
          icon: '♟️',
          title: 'Khai cuộc',
          duration: '1.5h',
          phaseContent: {
            1: 'Chessable review. Focus 1 opening per session.',
            2: 'Spaced repetition + new sidelines.',
            3: 'Practical review. Lines from recent games.',
            4: 'Final ôn tập + opponent prep.'
          }
        },
        {
          id: 'sat-8',
          time: '15:00',
          endTime: '16:00',
          type: 'mixed',
          icon: '♟️',
          title: 'Trung cuộc / Tàn cuộc',
          duration: '1h',
          phaseContent: {
            1: 'Mixed review: positional concepts + endgame practice.',
            2: 'Chess Structures + endgame drills.',
            3: 'Advanced themes. Piece coordination, dynamic play.',
            4: 'Ôn tập tổng hợp.'
          }
        },
        {
          id: 'sat-11',
          time: '16:00',
          endTime: '17:00',
          type: 'exercise',
          icon: '💪',
          title: 'Dumbbell Full Body (50p) + Stretch',
          description: 'Total body: compound movements. Push-ups, squats, rows, lunges, planks.'
        },
        {
          id: 'sat-9',
          time: '17:00',
          endTime: '17:30',
          type: 'meal',
          icon: '🍽️',
          title: 'Bữa tối',
          description: 'Salad protein (~600kcal). IF window đóng.'
        },
        {
          id: 'sat-10',
          time: '17:30',
          endTime: '19:30',
          type: 'rest',
          icon: '🎯',
          title: 'Thư giãn',
          description: 'Rời xa bàn cờ. Đọc sách, xem phim, dạo chơi.'
        }
      ]
    },

    0: { // Sunday
      name: 'Chủ Nhật',
      isRest: false,
      slots: [
        {
          id: 'sun-1',
          time: '05:00',
          endTime: '06:00',
          type: 'exercise',
          icon: '🚶',
          title: 'Active Recovery — Đi bộ / Yoga',
          description: '30-40 phút đi bộ nhẹ hoặc yoga. Hồi phục cơ bắp.'
        },
        {
          id: 'sun-2',
          time: '06:00',
          endTime: '09:00',
          type: 'play',
          icon: '⚔️',
          title: 'Đấu cờ / Giải đấu',
          duration: '3h',
          phaseContent: {
            1: 'Đấu online hoặc tham gia giải weekend. Fun but focused.',
            2: 'Giải mở rộng / rated games. Apply tuần học.',
            3: 'Giải quốc gia / competitive play.',
            4: 'Light practice games hoặc rest nếu mệt.'
          }
        },
        {
          id: 'sun-3',
          time: '09:00',
          endTime: '09:30',
          type: 'meal',
          icon: '🍳',
          title: 'Bữa sáng',
          description: 'Yến mạch + trứng + rau (~500kcal).'
        },
        {
          id: 'sun-4',
          time: '09:30',
          endTime: '12:00',
          type: 'review',
          icon: '📊',
          title: 'Tổng kết tuần',
          duration: '2.5h',
          phaseContent: {
            1: 'Review tất cả ván đấu trong tuần. Ghi lại patterns, mistakes, improvements.',
            2: 'Deep analysis ván đấu. So sánh với prep. Update opening repertoire.',
            3: 'Review + compare analysis với đối thủ mạnh hơn.',
            4: 'Tổng kết: What worked? What to improve? Confidence building.'
          }
        },
        {
          id: 'sun-5',
          time: '12:00',
          endTime: '13:00',
          type: 'rest',
          icon: '😴',
          title: 'Nghỉ trưa',
          description: 'Chợp mắt 30 phút.'
        },
        {
          id: 'sun-6',
          time: '13:00',
          endTime: '13:30',
          type: 'meal',
          icon: '🍚',
          title: 'Bữa trưa',
          description: 'Cơm gạo lứt + protein + rau (~700kcal).'
        },
        {
          id: 'sun-7',
          time: '13:30',
          endTime: '15:00',
          type: 'opening',
          icon: '♟️',
          title: 'Khai cuộc — Prep tuần mới',
          duration: '1.5h',
          phaseContent: {
            1: 'Plan tuần mới. Chọn biến khai cuộc focus cho tuần tới.',
            2: 'Review gaps. Which lines need more work?',
            3: 'Opponent prep cho giải sắp tới.',
            4: 'Final prep ASEAN Age Group. Specific opponent analysis.'
          }
        },
        {
          id: 'sun-8',
          time: '15:00',
          endTime: '16:30',
          type: 'mixed',
          icon: '♟️',
          title: 'Ôn tập tự do — Weak areas',
          duration: '1.5h',
          description: 'Focus vào điểm yếu. Tự chọn topic cần cải thiện nhất.'
        },
        {
          id: 'sun-9',
          time: '16:30',
          endTime: '17:00',
          type: 'meal',
          icon: '🍽️',
          title: 'Bữa tối',
          description: 'Bữa tối nhẹ (~600kcal). IF window đóng.'
        },
        {
          id: 'sun-10',
          time: '17:00',
          endTime: '19:00',
          type: 'rest',
          icon: '🎯',
          title: 'Thư giãn — Chuẩn bị tuần mới',
          description: 'Nghỉ ngơi, chuẩn bị tinh thần cho tuần mới.'
        }
      ]
    }
  },

  // ═══════════════════════════════════════════
  // SLOT TYPES — for color coding
  // ═══════════════════════════════════════════
  slotTypes: {
    exercise: { label: 'Thể dục', color: '#4CAF50', darkColor: '#1B5E20' },
    opening:  { label: 'Khai cuộc', color: '#2196F3', darkColor: '#0D47A1' },
    middlegame: { label: 'Trung cuộc', color: '#9C27B0', darkColor: '#4A148C' },
    endgame:  { label: 'Tàn cuộc', color: '#FF5722', darkColor: '#BF360C' },
    tactics:  { label: 'Chiến thuật', color: '#FF9800', darkColor: '#E65100' },
    play:     { label: 'Đấu cờ', color: '#F44336', darkColor: '#B71C1C' },
    study:    { label: 'Nghiên cứu', color: '#00BCD4', darkColor: '#006064' },
    review:   { label: 'Ôn tập', color: '#607D8B', darkColor: '#263238' },
    mixed:    { label: 'Tổng hợp', color: '#795548', darkColor: '#3E2723' },
    teaching: { label: 'Dạy cờ', color: '#8BC34A', darkColor: '#33691E' },
    meal:     { label: 'Ăn uống', color: '#78909C', darkColor: '#37474F' },
    rest:     { label: 'Nghỉ ngơi', color: '#546E7A', darkColor: '#1a2a33' }
  },

  // ═══════════════════════════════════════════
  // MATERIALS LIST
  // ═══════════════════════════════════════════
  materials: {
    openings: [
      { id: 'reti', name: 'Reti Opening', author: 'GM Arturs Neiksans', platform: 'Chessable', color: 'White', tier: '1800-2000' },
      { id: 'scandinavian', name: 'Scandinavian Defense', author: 'GM Arturs Neiksans', platform: 'Chessable', color: 'Black vs 1.e4', tier: '1800-2000' },
      { id: 'dutch', name: 'Dutch Leningrad', author: 'GM Arturs Neiksans', platform: 'Chessable', color: 'Black vs 1.d4', tier: '1800-2000' }
    ],
    endgames: [
      { id: 'eg-silman', name: "Silman's Complete Endgame Course", author: 'IM Jeremy Silman', tier: '1500-2000' },
      { id: 'eg-capablanca', name: "Capablanca's Best Endings", author: 'Irving Chernev', tier: '1500-1800' },
      { id: 'eg-100', name: '100 Endgames You Must Know', author: 'GM Jesus de la Villa', tier: '1800-2200' },
      { id: 'eg-shereshevsky', name: 'Endgame Strategy', author: 'Mikhail Shereshevsky', tier: '1800-2100' },
      { id: 'eg-studies101', name: 'Endgame Studies 101', author: 'IM Kostya Kavutskiy', platform: 'Chessable', tier: '1700-1900' },
      { id: 'eg-virtuoso', name: 'Endgame Virtuoso', author: 'Vasily Smyslov', tier: '2000-2200' },
      { id: 'eg-hellsten', name: 'Mastering Endgame Strategy', author: 'GM Johan Hellsten', tier: '2000-2200' },
      { id: 'eg-rook', name: 'Rook Endings', author: 'Levenfish & Smyslov', tier: '2200-2400' },
      { id: 'eg-dvoretsky', name: "Dvoretsky's Endgame Manual", author: 'GM Mark Dvoretsky', tier: '2300-2500' },
      { id: 'eg-korchnoi', name: 'Practical Rook Endgames', author: 'GM Victor Korchnoi', tier: '2300-2500' },
      { id: 'eg-perlo', name: 'Endgame Tactics', author: 'Ger van Perlo', tier: '2300-2500' }
    ],
    middlegames: [
      { id: 'mg-simple', name: 'Simple Chess', author: 'Michael Stean', tier: '1500-1700' },
      { id: 'mg-reassess', name: 'How to Reassess Your Chess', author: 'IM Jeremy Silman', tier: '1500-1800' },
      { id: 'mg-attack', name: 'Art of Attack in Chess', author: 'Vladimir Vukovic', tier: '1600-1800' },
      { id: 'mg-kct', name: 'U2000 Foundation of Positional Play', author: 'IM Renier Castellanos', platform: 'KCT', tier: '1800-2000' },
      { id: 'mg-evaluate', name: 'Evaluate Like a Grandmaster', author: 'GM Eugene Perelshteyn', tier: '1700-1900' },
      { id: 'mg-techniques', name: 'Techniques of Positional Play', author: 'Valeri Bronznik & Peter Heine Nielsen', tier: '1800-2000' },
      { id: 'mg-alekhine1924', name: 'New York 1924', author: 'Alexander Alekhine', tier: '1800-2000' },
      { id: 'mg-structures', name: 'Chess Structures — A Grandmaster Guide', author: 'GM Mauricio Flores Rios', tier: '2000-2200' },
      { id: 'mg-sins', name: 'Seven Deadly Chess Sins', author: 'Jonathan Rowson', tier: '1900-2200' },
      { id: 'mg-hellsten', name: 'Mastering Chess Strategy', author: 'GM Johan Hellsten', tier: '2000-2200' },
      { id: 'mg-bricard', name: 'Strategic Chess Exercises', author: 'Emmanuel Bricard', tier: '2100-2300' },
      { id: 'mg-tal1960', name: 'Tal-Botvinnik 1960', author: 'Mikhail Tal', tier: '2000-2200' },
      { id: 'mg-fischer', name: 'My 60 Memorable Games', author: 'GM Bobby Fischer', tier: '2000-2300' },
      { id: 'mg-tallife', name: 'Life & Games of Mikhail Tal', author: 'Mikhail Tal', tier: '2100-2300' },
      { id: 'mg-nunn', name: 'Secrets of Grandmaster Chess', author: 'GM John Nunn', tier: '2100-2300' },
      { id: 'mg-gelfand', name: 'Positional Decision Making', author: 'GM Boris Gelfand', tier: '2300-2500' },
      { id: 'mg-kramnik', name: 'Kramnik: My Life & Games', author: 'GM Vladimir Kramnik', tier: '2300-2500' },
      { id: 'mg-shirov', name: 'Fire on Board', author: 'GM Alexei Shirov', tier: '2300-2500' },
      { id: 'mg-kasparov-time', name: 'Test of Time', author: 'GM Garry Kasparov', tier: '2200-2400' },
      { id: 'mg-kasparov-pred', name: 'My Great Predecessors (5 vol)', author: 'GM Garry Kasparov', tier: '2400-2500' },
      { id: 'mg-alekhine-best', name: "Alekhine's Best Games", author: 'Alexander Alekhine', tier: '2300-2500' },
      { id: 'mg-manual', name: 'Complete Manual of Positional Chess', author: 'GM Sakaev & GM Landa', tier: '2000-2200' },
      { id: 'mg-kct-mem', name: 'Killer Chess Training (Membership)', author: 'killerchesstraining.com', platform: 'Web', type: 'membership', tier: '1800-2000' }
    ],
    tactics: [
      { id: 'tc-kct', name: 'Killer Chess Training', platform: 'killerchesstraining.com', type: 'membership', tier: '1800-2000' },
      { id: 'tc-polgar', name: 'Chess: 5334 Problems', author: 'Laszlo Polgar', tier: '1500-2400' },
      { id: 'tc-weteschnik', name: 'Chess Tactics From Scratch', author: 'Martin Weteschnik', tier: '1500-1800' },
      { id: 'tc-checkmate', name: 'Checkmate Patterns Manual', author: 'CraftyRaf', platform: 'Chessable', tier: '1600-1800' },
      { id: 'tc-quality', name: 'Quality Chess Puzzle Book', author: 'John Shaw', tier: '1600-1800' },
      { id: 'tc-erwich', name: '1001 Chess Exercises for Club Players', author: 'Frank Erwich', tier: '1500-1800' },
      { id: 'tc-hertan', name: 'Forcing Chess Moves', author: 'Charles Hertan', tier: '1700-2000' },
      { id: 'tc-supergm', name: 'Think Like a Super-GM', author: 'Michael Adams & Philip Hurtado', tier: '1800-2200' },
      { id: 'tc-woodpecker', name: 'Woodpecker Method', author: 'Axel Smith & Hans Tikkanen', tier: '2000-2200' },
      { id: 'tc-aagaard1', name: 'Excelling at Combinational Play', author: 'GM Jacob Aagaard', tier: '2000-2100' },
      { id: 'tc-edouard', name: 'Chess Calculation Training', author: 'Romain Edouard', tier: '2000-2100' },
      { id: 'tc-aagaard2', name: 'Excelling at Combinational Play 2', author: 'GM Jacob Aagaard', tier: '2100-2200' },
      { id: 'tc-cognitive', name: 'Cognitive Chess', author: 'Konstantin Chernyshov', tier: '2100-2200' },
      { id: 'tc-dvoretsky', name: 'Tactical Play (Dvoretsky)', author: 'GM Mark Dvoretsky', tier: '2100-2300' },
      { id: 'tc-volokitin', name: 'Perfect Your Chess', author: 'Andrei Volokitin', tier: '2100-2300' },
      { id: 'tc-gm-calc', name: 'GM Preparation: Calculation', author: 'GM Jacob Aagaard', tier: '2200-2500' },
      { id: 'tc-turbo', name: 'Turbo-Charge Your Tactics', author: 'Oleksiyenko & Grabinsky', tier: '2200-2400' },
      { id: 'tc-shankland', name: 'Calculation!', author: 'GM Sam Shankland', tier: '2200-2400' },
      { id: 'tc-hort', name: 'The Best Move', author: 'Vlastimil Hort', tier: '2200-2400' },
      { id: 'tc-imagination', name: 'Imagination in Chess', author: 'Paata Gaprindashvili', tier: '2300-2500' },
      { id: 'tc-recognize', name: "Recognizing Opponent's Resources", author: 'GM Mark Dvoretsky', tier: '2300-2500' },
      { id: 'tc-psakhis', name: 'Advanced Chess Tactics', author: 'Lev Psakhis', tier: '2400-2500' }
    ]
  }
};

// ═══════════════════════════════════════════
// UTILITY FUNCTIONS
// ═══════════════════════════════════════════

function getTrainingStartDate() {
  return new Date(TRAINING_CONFIG.startDate + 'T00:00:00');
}

function getCurrentWeek() {
  const start = getTrainingStartDate();
  const now = new Date();
  const diffMs = now - start;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const week = Math.floor(diffDays / 7) + 1;
  return Math.max(1, week);
}

function getTotalWeeks() {
  // For phases 1-4 only (short-term plan)
  const shortTermPhases = TRAINING_CONFIG.phases.filter(p => p.weekEnd);
  if (shortTermPhases.length === 0) return 20;
  return shortTermPhases[shortTermPhases.length - 1].weekEnd;
}

function getCurrentPhase() {
  const now = new Date();
  // Check date-based phases first (5-8)
  for (const phase of TRAINING_CONFIG.phases) {
    if (phase.dateStart && phase.dateEnd) {
      const start = new Date(phase.dateStart + 'T00:00:00');
      const end = new Date(phase.dateEnd + 'T23:59:59');
      if (now >= start && now <= end) return phase;
    }
  }
  // Fall back to week-based phases (1-4)
  const week = getCurrentWeek();
  for (const phase of TRAINING_CONFIG.phases) {
    if (phase.weekStart && phase.weekEnd && week >= phase.weekStart && week <= phase.weekEnd) {
      return phase;
    }
  }
  // Beyond all phases — find the appropriate one by date
  const futurePhases = TRAINING_CONFIG.phases.filter(p => p.dateEnd && new Date(p.dateEnd) > now);
  if (futurePhases.length > 0) return futurePhases[0];
  return TRAINING_CONFIG.phases[TRAINING_CONFIG.phases.length - 1];
}

// ═══ Schedule Presets ═══
// Based on research from ChessMood, Dvoretsky, NextLevelChess, Flores Rios, Hellsten
// Tactics 30-40% recommended for 1800-2200 (ChessMood, Dvoretsky)
// Periodization in 3-week blocks (NextLevelChess)
// Pre-tournament: decrease intensity, stop new material (NextLevelChess, GM Marin)

// Helper: common slots reused across presets
function _meal(id, time, title, desc) {
  return { id, time, endTime: _addMin(time, 30), type: 'meal', icon: title === 'Bữa sáng' ? '🍳' : title === 'Bữa trưa' ? '🍚' : '🍽️', title, description: desc };
}
function _rest(id, time, dur, title, desc) {
  return { id, time, endTime: _addMin(time, dur), type: 'rest', icon: '😴', title: title || 'Nghỉ trưa', description: desc || 'Chợp mắt 30 phút.' };
}
function _exercise(id, time, endTime, icon, title, desc) {
  return { id, time, endTime, type: 'exercise', icon, title, description: desc };
}
function _slot(id, time, endTime, type, icon, title, desc) {
  return { id, time, endTime, type, icon, title, description: desc, duration: _durStr(time, endTime) };
}
function _addMin(timeStr, min) {
  const [h, m] = timeStr.split(':').map(Number);
  const total = h * 60 + m + min;
  return `${String(Math.floor(total / 60)).padStart(2, '0')}:${String(total % 60).padStart(2, '0')}`;
}
function _durStr(start, end) {
  const s = start.split(':').map(Number), e = end.split(':').map(Number);
  const diff = (e[0] * 60 + e[1]) - (s[0] * 60 + s[1]);
  if (diff >= 60 && diff % 60 === 0) return `${diff / 60}h`;
  if (diff >= 60) return `${Math.floor(diff / 60)}h${diff % 60}m`;
  return `${diff}m`;
}

// Common exercise slots
const _runMon = _exercise('mon-ex', '21:00', '22:00', '🏃', 'Chạy bộ Zone 2 (45p) + Stretching', 'Cardio giảm cân, HR 120-140bpm. 15 phút stretching.');
const _runWed = _exercise('wed-ex', '21:00', '22:00', '🏃', 'Chạy bộ Zone 2 (45p) + Stretching', 'Cardio, HR 120-140bpm. 15 phút stretching.');
const _dumbTue = _exercise('tue-ex', '16:00', '17:00', '💪', 'Dumbbell Upper Body (50p) + Stretch', 'Chest press, rows, shoulder press, bicep curls. 3x12.');
const _dumbThu = _exercise('thu-ex', '16:00', '17:00', '💪', 'Dumbbell Lower Body (50p) + Stretch', 'Squats, lunges, RDL, calf raises. 3x12-15.');
const _dumbSat = _exercise('sat-ex', '16:00', '17:00', '💪', 'Dumbbell Full Body (50p) + Stretch', 'Total body: compound movements. Push-ups, squats, rows.');
const _sunRecovery = _exercise('sun-ex', '05:00', '06:00', '🚶', 'Active Recovery — Đi bộ / Yoga', '30-40 phút đi bộ nhẹ hoặc yoga.');

// ─── ENDGAME PRESET ───
// Focus: 14h endgame, 12h tactics, 6h play, 4h opening maintenance
const SCHEDULE_ENDGAME = {
  1: { name: 'Thứ 2', isRest: false, slots: [
    _slot('mon-1', '05:00', '08:00', 'endgame', '♟️', 'Tàn cuộc chuyên sâu', '100 Endgames / Silman / Shereshevsky. Học 2-3 positions mới, luyện trên board.'),
    _meal('mon-2', '09:00', 'Bữa sáng', 'Yến mạch + trứng + rau xanh (~500kcal).'),
    _slot('mon-3', '09:30', '12:00', 'tactics', '🧩', 'Bài tập chiến thuật', 'KCT: 25-30 bài/ngày. Pattern recognition + calculation depth 3-5 nước.'),
    _rest('mon-4', '12:00', 60), _meal('mon-5', '13:00', 'Bữa trưa', 'Cơm gạo lứt + protein + rau (~700kcal).'),
    _slot('mon-6', '13:30', '15:00', 'endgame', '♟️', 'Tàn cuộc — Drills', 'Luyện endgame positions trên Lichess. Pawn endings, Rook endings.'),
    _slot('mon-7', '15:00', '16:30', 'play', '⚔️', 'Đấu cờ & Phân tích', '1-2 ván 15+10, focus chuyển sang endgame thắng.'),
    _meal('mon-8', '16:30', 'Bữa tối', 'Salad protein + khoai lang (~600kcal).'),
    _slot('mon-9', '17:00', '19:00', 'teaching', '👨‍🏫', 'Dạy cờ', 'Trung tâm tỉnh.'),
    _runMon
  ]},
  2: { name: 'Thứ 3', isRest: false, slots: [
    _slot('tue-1', '05:00', '08:00', 'endgame', '♟️', 'Tàn cuộc — Rook Endings', 'Rook endings chuyên sâu: Lucena, Philidor, R+P vs R.'),
    _meal('tue-2', '09:00', 'Bữa sáng', 'Yến mạch + trứng + rau (~500kcal).'),
    _slot('tue-3', '09:30', '12:00', 'study', '📺', 'VODs — Endgame Technique', 'Ván mẫu GM minh họa endgame technique. Capablanca, Carlsen endgames.'),
    _rest('tue-4', '12:00', 60), _meal('tue-5', '13:00', 'Bữa trưa', 'Cơm gạo lứt + protein + rau (~700kcal).'),
    _slot('tue-6', '13:30', '15:00', 'teaching', '👨‍🏫', 'Dạy cờ', 'Trung tâm tỉnh.'),
    _slot('tue-7', '15:00', '16:00', 'tactics', '🧩', 'Chiến thuật', 'KCT: 15-20 bài. Mix themes.'),
    _dumbTue,
    _meal('tue-8', '17:00', 'Bữa tối', 'Salad protein (~600kcal).'),
    _slot('tue-9', '17:30', '19:30', 'opening', '♟️', 'Khai cuộc — Duy trì', 'Chessable Spaced Rep. Chỉ ôn lại, không học biến mới.')
  ]},
  3: { name: 'Thứ 4', isRest: false, slots: [
    _slot('wed-1', '05:00', '08:00', 'endgame', '♟️', 'Tàn cuộc — Minor Pieces', 'B vs N, opposite-colored bishops, N+P endings.'),
    _meal('wed-2', '09:00', 'Bữa sáng', 'Yến mạch + trứng + rau (~500kcal).'),
    _slot('wed-3', '09:30', '12:00', 'endgame', '♟️', 'Tàn cuộc — Practical Drills', 'Luyện positions trên board. Play out từ cuốn sách.'),
    _rest('wed-4', '12:00', 60), _meal('wed-5', '13:00', 'Bữa trưa', 'Cơm gạo lứt + protein + rau (~700kcal).'),
    _slot('wed-6', '13:30', '16:30', 'teaching', '👨‍🏫', 'Dạy cờ', 'Trung tâm tỉnh (buổi chiều dài).'),
    _meal('wed-7', '16:30', 'Bữa tối', 'Salad protein (~600kcal).'),
    _slot('wed-8', '17:00', '19:00', 'teaching', '👨‍🏫', 'Dạy cờ', 'Trung tâm tỉnh (buổi tối).'),
    _runWed
  ]},
  4: { name: 'Thứ 5', isRest: false, slots: [
    _slot('thu-1', '05:00', '08:00', 'tactics', '🧩', 'Chiến thuật chuyên sâu', 'KCT: 30+ bài. Calculation depth 3-5 nước. Blindfold practice.'),
    _meal('thu-2', '09:00', 'Bữa sáng', 'Yến mạch + trứng + rau (~500kcal).'),
    _slot('thu-3', '09:30', '12:00', 'endgame', '♟️', 'Tàn cuộc — Queen & Complex', 'Queen endings, R+B/N endings. Advanced techniques.'),
    _rest('thu-4', '12:00', 60), _meal('thu-5', '13:00', 'Bữa trưa', 'Cơm gạo lứt + protein + rau (~700kcal).'),
    _slot('thu-6', '13:30', '15:00', 'middlegame', '♟️', 'Trung cuộc — Duy trì', 'Positional concepts review. Weak squares, pawn chains.'),
    _slot('thu-7', '15:00', '16:00', 'tactics', '🧩', 'Chiến thuật', 'KCT: 15-20 bài. Hard puzzles.'),
    _dumbThu,
    _meal('thu-8', '17:00', 'Bữa tối', 'Salad protein (~600kcal).'),
    _slot('thu-9', '17:30', '19:30', 'endgame', '♟️', 'Tàn cuộc — Ôn tập', '100 Endgames review + practice positions.')
  ]},
  5: { name: 'Thứ 6', isRest: true,
    restMessage: '🟢 Nghỉ ngơi — Hồi phục năng lượng. Đi bộ nhẹ 30 phút nếu muốn.',
    slots: [
      _exercise('fri-1', '07:00', '07:30', '🚶', 'Đi bộ nhẹ (optional)', '30 phút đi bộ thư giãn.'),
      _meal('fri-2', '09:00', 'Bữa sáng', 'Ăn thoải mái.'), _meal('fri-3', '13:00', 'Bữa trưa', 'Ăn tự do.'), _meal('fri-4', '16:30', 'Bữa tối', 'IF window đóng.')
    ]
  },
  6: { name: 'Thứ 7', isRest: false, slots: [
    _slot('sat-1', '05:00', '08:00', 'play', '⚔️', 'Đấu cờ / Giải đấu', 'Đấu online 15+10 hoặc giải weekend. Focus endgame technique.'),
    _meal('sat-2', '09:00', 'Bữa sáng', 'Yến mạch + trứng + rau (~500kcal).'),
    _slot('sat-3', '09:30', '12:00', 'tactics', '🧩', 'Bài tập chiến thuật chuyên sâu', 'Complex tactics + endgame-style puzzles. 25+ bài.'),
    _rest('sat-4', '12:00', 60), _meal('sat-5', '13:00', 'Bữa trưa', 'Cơm gạo lứt + protein + rau (~700kcal).'),
    _slot('sat-6', '13:30', '15:00', 'opening', '♟️', 'Khai cuộc — Duy trì', 'Chessable Spaced Rep. Ôn repertoire.'),
    _slot('sat-7', '15:00', '16:00', 'endgame', '♟️', 'Tàn cuộc — Weekly Review', 'Ôn lại positions đã học trong tuần.'),
    _dumbSat,
    _meal('sat-8', '17:00', 'Bữa tối', 'Salad protein (~600kcal).'),
    _slot('sat-9', '17:30', '19:30', 'rest', '🎯', 'Thư giãn', 'Rời xa bàn cờ. Đọc sách, xem phim.')
  ]},
  0: { name: 'Chủ Nhật', isRest: false, slots: [
    _sunRecovery,
    _slot('sun-1', '06:00', '09:00', 'play', '⚔️', 'Đấu cờ / Giải đấu', 'Đấu online hoặc giải weekend. Apply endgame technique.'),
    _meal('sun-2', '09:00', 'Bữa sáng', 'Yến mạch + trứng + rau (~500kcal).'),
    _slot('sun-3', '09:30', '12:00', 'review', '📊', 'Tổng kết tuần', 'Review ván đấu trong tuần. Focus endgame analysis.'),
    _rest('sun-4', '12:00', 60), _meal('sun-5', '13:00', 'Bữa trưa', 'Cơm gạo lứt + protein + rau (~700kcal).'),
    _slot('sun-6', '13:30', '15:00', 'endgame', '♟️', 'Tàn cuộc — Prep tuần mới', 'Chọn chủ đề endgame cho tuần tới. Plan study.'),
    _slot('sun-7', '15:00', '16:30', 'endgame', '♟️', 'Tàn cuộc — Study', 'Focus vào chủ đề yếu nhất.'),
    _meal('sun-8', '16:30', 'Bữa tối', 'Bữa tối nhẹ (~600kcal).'),
    _slot('sun-9', '17:00', '19:00', 'rest', '🎯', 'Thư giãn', 'Nghỉ ngơi, chuẩn bị tuần mới.')
  ]}
};

// ─── MIDDLEGAME PRESET ───
// Focus: 14h middlegame, 12h tactics, 8h play, 4h opening/endgame maintenance
const SCHEDULE_MIDDLEGAME = {
  1: { name: 'Thứ 2', isRest: false, slots: [
    _slot('mon-1', '05:00', '08:00', 'middlegame', '♟️', 'Trung cuộc — Positional Play', 'Chess Structures (Flores Rios) / Mastering Chess Strategy (Hellsten). Pawn structures + plans.'),
    _meal('mon-2', '09:00', 'Bữa sáng', 'Yến mạch + trứng + rau xanh (~500kcal).'),
    _slot('mon-3', '09:30', '12:00', 'tactics', '🧩', 'Bài tập chiến thuật', 'KCT: 25-30 bài/ngày. Focus positional tactics + combinations.'),
    _rest('mon-4', '12:00', 60), _meal('mon-5', '13:00', 'Bữa trưa', 'Cơm gạo lứt + protein + rau (~700kcal).'),
    _slot('mon-6', '13:30', '15:00', 'middlegame', '♟️', 'Trung cuộc — Exercises', 'Solve positional puzzles. Hellsten exercises. 20+ bài.'),
    _slot('mon-7', '15:00', '16:30', 'play', '⚔️', 'Đấu cờ & Phân tích', '1-2 ván 15+10, focus positional decisions.'),
    _meal('mon-8', '16:30', 'Bữa tối', 'Salad protein + khoai lang (~600kcal).'),
    _slot('mon-9', '17:00', '19:00', 'teaching', '👨‍🏫', 'Dạy cờ', 'Trung tâm tỉnh.'),
    _runMon
  ]},
  2: { name: 'Thứ 3', isRest: false, slots: [
    _slot('tue-1', '05:00', '08:00', 'middlegame', '♟️', 'Trung cuộc — Pawn Structures', 'Chess Structures deep study. 3-4 cấu trúc mới/tuần. Model games.'),
    _meal('tue-2', '09:00', 'Bữa sáng', 'Yến mạch + trứng + rau (~500kcal).'),
    _slot('tue-3', '09:30', '12:00', 'study', '📺', 'VODs — Ván mẫu GM Positional', 'Karpov, Petrosian, Carlsen. Prophylactic thinking, long-term planning.'),
    _rest('tue-4', '12:00', 60), _meal('tue-5', '13:00', 'Bữa trưa', 'Cơm gạo lứt + protein + rau (~700kcal).'),
    _slot('tue-6', '13:30', '15:00', 'teaching', '👨‍🏫', 'Dạy cờ', 'Trung tâm tỉnh.'),
    _slot('tue-7', '15:00', '16:00', 'tactics', '🧩', 'Chiến thuật', 'KCT: 15-20 bài. Positional combinations.'),
    _dumbTue,
    _meal('tue-8', '17:00', 'Bữa tối', 'Salad protein (~600kcal).'),
    _slot('tue-9', '17:30', '19:30', 'opening', '♟️', 'Khai cuộc — Duy trì', 'Spaced Rep. Liên kết khai cuộc → cấu trúc tốt → plans.')
  ]},
  3: { name: 'Thứ 4', isRest: false, slots: [
    _slot('wed-1', '05:00', '08:00', 'middlegame', '♟️', 'Trung cuộc — Strategy', 'Advanced: prophylaxis, positional sacrifices, piece coordination.'),
    _meal('wed-2', '09:00', 'Bữa sáng', 'Yến mạch + trứng + rau (~500kcal).'),
    _slot('wed-3', '09:30', '12:00', 'middlegame', '♟️', 'Trung cuộc — Model Games', 'Phân tích ván GM chuyên sâu. Pause và đoán nước đi.'),
    _rest('wed-4', '12:00', 60), _meal('wed-5', '13:00', 'Bữa trưa', 'Cơm gạo lứt + protein + rau (~700kcal).'),
    _slot('wed-6', '13:30', '16:30', 'teaching', '👨‍🏫', 'Dạy cờ', 'Trung tâm tỉnh (buổi chiều dài).'),
    _meal('wed-7', '16:30', 'Bữa tối', 'Salad protein (~600kcal).'),
    _slot('wed-8', '17:00', '19:00', 'teaching', '👨‍🏫', 'Dạy cờ', 'Trung tâm tỉnh (buổi tối).'),
    _runWed
  ]},
  4: { name: 'Thứ 5', isRest: false, slots: [
    _slot('thu-1', '05:00', '08:00', 'tactics', '🧩', 'Chiến thuật chuyên sâu', 'KCT: 30+ bài. Complex combinations + positional tactics.'),
    _meal('thu-2', '09:00', 'Bữa sáng', 'Yến mạch + trứng + rau (~500kcal).'),
    _slot('thu-3', '09:30', '12:00', 'middlegame', '♟️', 'Trung cuộc — Weak Squares & Outposts', 'Focus: weak squares, outposts, piece activity, open files.'),
    _rest('thu-4', '12:00', 60), _meal('thu-5', '13:00', 'Bữa trưa', 'Cơm gạo lứt + protein + rau (~700kcal).'),
    _slot('thu-6', '13:30', '15:00', 'endgame', '♟️', 'Tàn cuộc — Duy trì', 'Ôn lại endgame positions. Light practice.'),
    _slot('thu-7', '15:00', '16:00', 'tactics', '🧩', 'Chiến thuật', 'KCT: 15-20 bài.'),
    _dumbThu,
    _meal('thu-8', '17:00', 'Bữa tối', 'Salad protein (~600kcal).'),
    _slot('thu-9', '17:30', '19:30', 'middlegame', '♟️', 'Trung cuộc — Planning', 'Học planning: khi nào attack, khi nào defend, khi nào đổi quân.')
  ]},
  5: { name: 'Thứ 6', isRest: true,
    restMessage: '🟢 Nghỉ ngơi — Hồi phục năng lượng.',
    slots: [
      _exercise('fri-1', '07:00', '07:30', '🚶', 'Đi bộ nhẹ (optional)', '30 phút đi bộ thư giãn.'),
      _meal('fri-2', '09:00', 'Bữa sáng', 'Ăn thoải mái.'), _meal('fri-3', '13:00', 'Bữa trưa', 'Ăn tự do.'), _meal('fri-4', '16:30', 'Bữa tối', 'IF window đóng.')
    ]
  },
  6: { name: 'Thứ 7', isRest: false, slots: [
    _slot('sat-1', '05:00', '08:00', 'play', '⚔️', 'Đấu cờ / Giải đấu', 'Đấu online 15+10 hoặc giải. Focus áp dụng positional concepts.'),
    _meal('sat-2', '09:00', 'Bữa sáng', 'Yến mạch + trứng + rau (~500kcal).'),
    _slot('sat-3', '09:30', '12:00', 'tactics', '🧩', 'Bài tập chuyên sâu', 'Complex positional tactics. 25+ bài.'),
    _rest('sat-4', '12:00', 60), _meal('sat-5', '13:00', 'Bữa trưa', 'Cơm gạo lứt + protein + rau (~700kcal).'),
    _slot('sat-6', '13:30', '15:00', 'middlegame', '♟️', 'Trung cuộc — Weekly Review', 'Ôn lại concepts đã học trong tuần.'),
    _slot('sat-7', '15:00', '16:00', 'play', '⚔️', 'Đấu cờ nhanh', '2-3 ván rapid. Apply positional ideas.'),
    _dumbSat,
    _meal('sat-8', '17:00', 'Bữa tối', 'Salad protein (~600kcal).'),
    _slot('sat-9', '17:30', '19:30', 'rest', '🎯', 'Thư giãn', 'Rời xa bàn cờ.')
  ]},
  0: { name: 'Chủ Nhật', isRest: false, slots: [
    _sunRecovery,
    _slot('sun-1', '06:00', '09:00', 'play', '⚔️', 'Đấu cờ / Giải đấu', 'Đấu online. Focus positional play.'),
    _meal('sun-2', '09:00', 'Bữa sáng', 'Yến mạch + trứng + rau (~500kcal).'),
    _slot('sun-3', '09:30', '12:00', 'review', '📊', 'Tổng kết tuần', 'Review ván đấu. Focus positional decisions & pawn structures.'),
    _rest('sun-4', '12:00', 60), _meal('sun-5', '13:00', 'Bữa trưa', 'Cơm gạo lứt + protein + rau (~700kcal).'),
    _slot('sun-6', '13:30', '15:00', 'middlegame', '♟️', 'Trung cuộc — Prep tuần mới', 'Chọn pawn structures focus tuần tới.'),
    _slot('sun-7', '15:00', '16:30', 'mixed', '♟️', 'Ôn tập tự do', 'Focus vào điểm yếu.'),
    _meal('sun-8', '16:30', 'Bữa tối', 'Bữa tối nhẹ (~600kcal).'),
    _slot('sun-9', '17:00', '19:00', 'rest', '🎯', 'Thư giãn', 'Nghỉ ngơi, chuẩn bị tuần mới.')
  ]}
};

// ─── TOURNAMENT PRESET ───
// Focus: Max tactics (16h), play (10h), opponent prep (6h). NO TEACHING.
// Based on NextLevelChess & GM Marin pre-tournament advice
const SCHEDULE_TOURNAMENT = {
  1: { name: 'Thứ 2', isRest: false, slots: [
    _slot('mon-1', '05:00', '08:00', 'tactics', '🧩', 'Chiến thuật — Calculation', 'KCT: 30+ bài. Deep calculation 4-6 nước. Blindfold variations.'),
    _meal('mon-2', '09:00', 'Bữa sáng', 'Yến mạch + trứng + rau xanh (~500kcal).'),
    _slot('mon-3', '09:30', '12:00', 'play', '⚔️', 'Đấu cờ — Tournament Simulation', '2 ván 30+0. Simulate tournament: clock management, focus.'),
    _rest('mon-4', '12:00', 60), _meal('mon-5', '13:00', 'Bữa trưa', 'Cơm gạo lứt + protein + rau (~700kcal).'),
    _slot('mon-6', '13:30', '15:00', 'middlegame', '♟️', 'Trung cuộc — Calculation Practice', 'Deep analysis positions. Think 10+ phút/position.'),
    _slot('mon-7', '15:00', '16:30', 'tactics', '🧩', 'Chiến thuật — Pattern Drill', 'Speed solving: 50+ bài easy-medium. Build pattern recognition.'),
    _meal('mon-8', '16:30', 'Bữa tối', 'Salad protein + khoai lang (~600kcal).'),
    _slot('mon-9', '17:00', '19:00', 'study', '🎯', 'Opponent Prep', 'Phân tích ván đấu đối thủ giải sắp tới. Tìm weakness.'),
    _runMon
  ]},
  2: { name: 'Thứ 3', isRest: false, slots: [
    _slot('tue-1', '05:00', '08:00', 'tactics', '🧩', 'Chiến thuật — Hard Puzzles', 'KCT: 25 bài hard. Calculation depth 5+ nước.'),
    _meal('tue-2', '09:00', 'Bữa sáng', 'Yến mạch + trứng + rau (~500kcal).'),
    _slot('tue-3', '09:30', '12:00', 'endgame', '♟️', 'Tàn cuộc — Practical Drills', 'Endgame positions thực chiến. R+P, K+P, minor piece endings.'),
    _rest('tue-4', '12:00', 60), _meal('tue-5', '13:00', 'Bữa trưa', 'Cơm gạo lứt + protein + rau (~700kcal).'),
    _slot('tue-6', '13:30', '15:00', 'opening', '♟️', 'Khai cuộc — Ôn tập', 'Chessable Spaced Rep. KHÔNG học biến mới. Chỉ ôn.'),
    _slot('tue-7', '15:00', '16:00', 'tactics', '🧩', 'Chiến thuật', 'KCT: 15-20 bài. Mix themes.'),
    _dumbTue,
    _meal('tue-8', '17:00', 'Bữa tối', 'Salad protein (~600kcal).'),
    _slot('tue-9', '17:30', '19:30', 'study', '🎯', 'Opponent Prep', 'Phân tích đối thủ: khai cuộc hay chơi, weakness patterns.')
  ]},
  3: { name: 'Thứ 4', isRest: false, slots: [
    _slot('wed-1', '05:00', '08:00', 'play', '⚔️', 'Đấu cờ — Serious Games', '1-2 ván 30+0. Tournament conditions. Deep analysis sau mỗi ván.'),
    _meal('wed-2', '09:00', 'Bữa sáng', 'Yến mạch + trứng + rau (~500kcal).'),
    _slot('wed-3', '09:30', '12:00', 'tactics', '🧩', 'Chiến thuật chuyên sâu', 'KCT: 30+ bài. Complex multi-move combinations.'),
    _rest('wed-4', '12:00', 60), _meal('wed-5', '13:00', 'Bữa trưa', 'Cơm gạo lứt + protein + rau (~700kcal).'),
    _slot('wed-6', '13:30', '15:00', 'middlegame', '♟️', 'Trung cuộc — Critical Moments', 'Phân tích critical decisions từ ván giải gần đây.'),
    _slot('wed-7', '15:00', '16:30', 'endgame', '♟️', 'Tàn cuộc — Key Positions', 'Ôn lại must-know endgames. Speed drills.'),
    _meal('wed-8', '16:30', 'Bữa tối', 'Salad protein (~600kcal).'),
    _slot('wed-9', '17:00', '19:00', 'study', '🎯', 'Opponent Prep', 'Chuẩn bị khai cuộc specific cho đối thủ.'),
    _runWed
  ]},
  4: { name: 'Thứ 5', isRest: false, slots: [
    _slot('thu-1', '05:00', '08:00', 'tactics', '🧩', 'Chiến thuật — Speed & Accuracy', 'KCT: 40+ bài mixed difficulty. Tốc độ + chính xác.'),
    _meal('thu-2', '09:00', 'Bữa sáng', 'Yến mạch + trứng + rau (~500kcal).'),
    _slot('thu-3', '09:30', '12:00', 'study', '📺', 'Phân tích ván đấu', 'Review ván mình gần đây. Tìm recurring patterns & mistakes.'),
    _rest('thu-4', '12:00', 60), _meal('thu-5', '13:00', 'Bữa trưa', 'Cơm gạo lứt + protein + rau (~700kcal).'),
    _slot('thu-6', '13:30', '15:00', 'play', '⚔️', 'Đấu cờ — Practice', '2 ván 15+10. Apply prep.'),
    _slot('thu-7', '15:00', '16:00', 'opening', '♟️', 'Khai cuộc — Specific Prep', 'Chuẩn bị anti-systems cho đối thủ cụ thể.'),
    _dumbThu,
    _meal('thu-8', '17:00', 'Bữa tối', 'Salad protein (~600kcal).'),
    _slot('thu-9', '17:30', '19:30', 'tactics', '🧩', 'Chiến thuật buổi tối', 'Easy-medium puzzles. Build confidence trước giải.')
  ]},
  5: { name: 'Thứ 6', isRest: true,
    restMessage: '🟢 Nghỉ ngơi HOÀN TOÀN — Hồi phục trước giải. Không cờ!',
    slots: [
      _exercise('fri-1', '07:00', '07:30', '🚶', 'Đi bộ nhẹ', '30 phút đi bộ thư giãn. Thiền 10 phút.'),
      _meal('fri-2', '09:00', 'Bữa sáng', 'Ăn healthy, đủ carbs.'), _meal('fri-3', '13:00', 'Bữa trưa', 'Ăn đủ chất.'), _meal('fri-4', '16:30', 'Bữa tối', 'Nhẹ nhàng.')
    ]
  },
  6: { name: 'Thứ 7', isRest: false, slots: [
    _slot('sat-1', '05:00', '08:00', 'play', '⚔️', 'Đấu cờ — Tournament Sim', 'Simulate: 1-2 ván 30+0. Clock management.'),
    _meal('sat-2', '09:00', 'Bữa sáng', 'Yến mạch + trứng + rau (~500kcal).'),
    _slot('sat-3', '09:30', '12:00', 'tactics', '🧩', 'Chiến thuật — Mixed', 'Tournament-level puzzles. 30+ bài. Time pressure practice.'),
    _rest('sat-4', '12:00', 60), _meal('sat-5', '13:00', 'Bữa trưa', 'Cơm gạo lứt + protein + rau (~700kcal).'),
    _slot('sat-6', '13:30', '15:00', 'middlegame', '♟️', 'Trung cuộc — Review', 'Ôn key concepts. Critical positions.'),
    _slot('sat-7', '15:00', '16:00', 'study', '🎯', 'Opponent Prep', 'Final prep cho đối thủ tiếp theo.'),
    _dumbSat,
    _meal('sat-8', '17:00', 'Bữa tối', 'Salad protein (~600kcal).'),
    _slot('sat-9', '17:30', '19:30', 'rest', '🎯', 'Thư giãn & Visualization', 'Nghỉ ngơi. Visualize ván đấu thành công.')
  ]},
  0: { name: 'Chủ Nhật', isRest: false, slots: [
    _sunRecovery,
    _slot('sun-1', '06:00', '09:00', 'play', '⚔️', 'Đấu cờ / Giải đấu', 'Tournament games hoặc serious practice.'),
    _meal('sun-2', '09:00', 'Bữa sáng', 'Yến mạch + trứng + rau (~500kcal).'),
    _slot('sun-3', '09:30', '12:00', 'tactics', '🧩', 'Chiến thuật — Confidence Building', 'Solve bài dễ-trung bình. Build confidence. 30+ bài.'),
    _rest('sun-4', '12:00', 60), _meal('sun-5', '13:00', 'Bữa trưa', 'Cơm gạo lứt + protein + rau (~700kcal).'),
    _slot('sun-6', '13:30', '15:00', 'study', '🎯', 'Opponent Prep — Final Review', 'Review all opponent files. Lock in preparation.'),
    _slot('sun-7', '15:00', '16:30', 'endgame', '♟️', 'Tàn cuộc — Must-Know Review', 'Ôn lại must-know endgames. Speed drill.'),
    _meal('sun-8', '16:30', 'Bữa tối', 'Bữa tối nhẹ (~600kcal).'),
    _slot('sun-9', '17:00', '19:00', 'rest', '🎯', 'Thư giãn', 'Preparation complete. Nghỉ ngơi, tự tin.')
  ]}
};

// ─── RECOVERY PRESET ───
// Focus: Game analysis (8h), VODs (8h), light everything. 36h total.
// Based on NextLevelChess & ChessMood post-tournament advice
const SCHEDULE_RECOVERY = {
  1: { name: 'Thứ 2', isRest: false, slots: [
    _slot('mon-1', '06:00', '08:00', 'review', '📊', 'Phân tích ván giải', 'Phân tích từng ván: opening accuracy, critical moments, endgame.'),
    _meal('mon-2', '09:00', 'Bữa sáng', 'Yến mạch + trứng + rau xanh (~500kcal).'),
    _slot('mon-3', '09:30', '12:00', 'study', '📺', 'VODs — Thư giãn & Học', 'Xem ván mẫu GM yêu thích. Fischer, Tal, Carlsen. Thưởng thức cờ.'),
    _rest('mon-4', '12:00', 60), _meal('mon-5', '13:00', 'Bữa trưa', 'Cơm gạo lứt + protein + rau (~700kcal).'),
    _slot('mon-6', '13:30', '15:00', 'tactics', '🧩', 'Chiến thuật nhẹ', 'KCT: 15 bài. Không ép. Thưởng thức process.'),
    _slot('mon-7', '15:00', '16:30', 'rest', '🌿', 'Nghỉ chiều', 'Đọc sách cờ nhẹ nhàng hoặc nghỉ ngơi.'),
    _meal('mon-8', '16:30', 'Bữa tối', 'Salad protein + khoai lang (~600kcal).'),
    _slot('mon-9', '17:00', '19:00', 'teaching', '👨‍🏫', 'Dạy cờ', 'Trung tâm tỉnh.'),
    _runMon
  ]},
  2: { name: 'Thứ 3', isRest: false, slots: [
    _slot('tue-1', '06:00', '08:00', 'review', '📊', 'Phân tích ván giải', 'Tiếp tục phân tích ván. Error chart: recurring mistakes.'),
    _meal('tue-2', '09:00', 'Bữa sáng', 'Yến mạch + trứng + rau (~500kcal).'),
    _slot('tue-3', '09:30', '12:00', 'study', '📺', 'VODs — Ván mẫu cổ điển', 'Zurich 1953, My 60 Memorable Games, Tal classics.'),
    _rest('tue-4', '12:00', 60), _meal('tue-5', '13:00', 'Bữa trưa', 'Cơm gạo lứt + protein + rau (~700kcal).'),
    _slot('tue-6', '13:30', '15:00', 'teaching', '👨‍🏫', 'Dạy cờ', 'Trung tâm tỉnh.'),
    _slot('tue-7', '15:00', '16:00', 'endgame', '♟️', 'Tàn cuộc nhẹ', 'Ôn lại endgame positions. Casual practice.'),
    _dumbTue,
    _meal('tue-8', '17:00', 'Bữa tối', 'Salad protein (~600kcal).'),
    _slot('tue-9', '17:30', '19:00', 'opening', '♟️', 'Khai cuộc — Light Review', 'Spaced rep nhẹ. Explore biến mới cho fun.')
  ]},
  3: { name: 'Thứ 4', isRest: false, slots: [
    _slot('wed-1', '06:00', '08:00', 'review', '📊', 'Phân tích ván giải — Deep Dive', 'So sánh analysis của mình vs engine. Key learning points.'),
    _meal('wed-2', '09:00', 'Bữa sáng', 'Yến mạch + trứng + rau (~500kcal).'),
    _slot('wed-3', '09:30', '12:00', 'middlegame', '♟️', 'Trung cuộc — Đọc sách', 'Đọc sách cờ nhẹ nhàng. My System, Chess Structures.'),
    _rest('wed-4', '12:00', 60), _meal('wed-5', '13:00', 'Bữa trưa', 'Cơm gạo lứt + protein + rau (~700kcal).'),
    _slot('wed-6', '13:30', '16:30', 'teaching', '👨‍🏫', 'Dạy cờ', 'Trung tâm tỉnh (buổi chiều dài).'),
    _meal('wed-7', '16:30', 'Bữa tối', 'Salad protein (~600kcal).'),
    _slot('wed-8', '17:00', '19:00', 'teaching', '👨‍🏫', 'Dạy cờ', 'Trung tâm tỉnh (buổi tối).'),
    _runWed
  ]},
  4: { name: 'Thứ 5', isRest: false, slots: [
    _slot('thu-1', '06:00', '08:00', 'study', '📺', 'VODs — Documentary & Fun', 'Xem chess documentary, interviews, fun games. Rekindle passion.'),
    _meal('thu-2', '09:00', 'Bữa sáng', 'Yến mạch + trứng + rau (~500kcal).'),
    _slot('thu-3', '09:30', '12:00', 'tactics', '🧩', 'Chiến thuật thoải mái', 'KCT: 15-20 bài. Mixed difficulty. No pressure.'),
    _rest('thu-4', '12:00', 60), _meal('thu-5', '13:00', 'Bữa trưa', 'Cơm gạo lứt + protein + rau (~700kcal).'),
    _slot('thu-6', '13:30', '15:00', 'middlegame', '♟️', 'Trung cuộc — Reflection', 'Nhìn lại những gì đã học. What worked? What to improve?'),
    _slot('thu-7', '15:00', '16:00', 'endgame', '♟️', 'Tàn cuộc nhẹ', 'Practice endgame positions casual.'),
    _dumbThu,
    _meal('thu-8', '17:00', 'Bữa tối', 'Salad protein (~600kcal).'),
    _slot('thu-9', '17:30', '19:00', 'rest', '🌿', 'Thư giãn buổi tối', 'Đọc sách, xem phim, dạo chơi.')
  ]},
  5: { name: 'Thứ 6', isRest: true,
    restMessage: '🟢 Nghỉ ngơi hoàn toàn — Hồi phục sau giải. Enjoy life!',
    slots: [
      _exercise('fri-1', '07:00', '07:30', '🚶', 'Đi bộ nhẹ (optional)', '30 phút đi bộ thư giãn.'),
      _meal('fri-2', '09:00', 'Bữa sáng', 'Ăn thoải mái.'), _meal('fri-3', '13:00', 'Bữa trưa', 'Ăn tự do.'), _meal('fri-4', '16:30', 'Bữa tối', 'Ăn gì thích.')
    ]
  },
  6: { name: 'Thứ 7', isRest: true,
    restMessage: '🟢 Nghỉ thêm ngày Thứ 7 — Hồi phục sau giai đoạn cường độ cao.',
    slots: [
      _exercise('sat-1', '07:00', '07:30', '🚶', 'Đi bộ nhẹ', 'Active recovery.'),
      _meal('sat-2', '09:00', 'Bữa sáng', 'Ăn thoải mái.'),
      _slot('sat-3', '10:00', '12:00', 'play', '⚔️', 'Casual Chess', 'Chơi blitz, Fischer random, bullet — cho FUN. Không áp lực.'),
      _meal('sat-4', '13:00', 'Bữa trưa', 'Ăn tự do.'),
      _slot('sat-5', '14:00', '16:00', 'study', '📺', 'VODs Thư giãn', 'Xem ván mẫu hoặc chess content yêu thích.'),
      _dumbSat,
      _meal('sat-6', '17:00', 'Bữa tối', 'Salad protein (~600kcal).'),
      _slot('sat-7', '17:30', '19:30', 'rest', '🎯', 'Thư giãn', 'Rời xa bàn cờ.')
    ]
  },
  0: { name: 'Chủ Nhật', isRest: false, slots: [
    _sunRecovery,
    _slot('sun-1', '06:00', '08:00', 'review', '📊', 'Tổng kết giải — Final Review', 'Tổng kết toàn bộ giải. Error chart. Key takeaways.'),
    _meal('sun-2', '09:00', 'Bữa sáng', 'Yến mạch + trứng + rau (~500kcal).'),
    _slot('sun-3', '09:30', '12:00', 'study', '📺', 'VODs — Inspiration', 'Xem ván mẫu inspirational. Rekindle motivation cho chu kỳ mới.'),
    _rest('sun-4', '12:00', 60), _meal('sun-5', '13:00', 'Bữa trưa', 'Cơm gạo lứt + protein + rau (~700kcal).'),
    _slot('sun-6', '13:30', '15:00', 'tactics', '🧩', 'Chiến thuật nhẹ', 'Easy puzzles. Fun solving. 15 bài.'),
    _slot('sun-7', '15:00', '16:30', 'mixed', '♟️', 'Lên kế hoạch chu kỳ mới', 'Plan: chủ đề focus tiếp theo, chọn preset phù hợp.'),
    _meal('sun-8', '16:30', 'Bữa tối', 'Bữa tối nhẹ (~600kcal).'),
    _slot('sun-9', '17:00', '19:00', 'rest', '🎯', 'Thư giãn', 'Nghỉ ngơi, chuẩn bị chu kỳ mới.')
  ]}
};

// ═══ Schedule Profile System ═══

const SCHEDULE_PROFILES_VERSION = 2; // Increment to force profile reset with new presets

function getScheduleProfiles() {
  const savedVersion = parseInt(localStorage.getItem('chess_schedule_profiles_version') || '0');
  if (savedVersion >= SCHEDULE_PROFILES_VERSION) {
    const custom = JSON.parse(localStorage.getItem('chess_schedule_profiles') || 'null');
    if (custom) return custom;
  }
  // Initialize with all built-in presets
  const defaultProfiles = {
    'default': {
      name: '🟢 Khai Cuộc — Xây Dựng Repertoire',
      description: 'Focus khai cuộc mới + tactics tăng cường. Phù hợp khi học Reti/Scandinavian/Dutch.',
      schedule: JSON.parse(JSON.stringify(TRAINING_CONFIG.weeklySchedule)),
      isDefault: true,
      isBuiltIn: true,
      createdAt: new Date().toISOString()
    },
    'endgame': {
      name: '🔵 Tàn Cuộc — Endgame Mastery',
      description: 'Focus 100 Endgames / Silman / Shereshevsky. 14h tàn cuộc + 12h chiến thuật/tuần.',
      schedule: JSON.parse(JSON.stringify(SCHEDULE_ENDGAME)),
      isDefault: false,
      isBuiltIn: true,
      createdAt: new Date().toISOString()
    },
    'middlegame': {
      name: '🟣 Trung Cuộc — Positional Mastery',
      description: 'Focus Chess Structures + Hellsten. 14h trung cuộc + 12h chiến thuật/tuần.',
      schedule: JSON.parse(JSON.stringify(SCHEDULE_MIDDLEGAME)),
      isDefault: false,
      isBuiltIn: true,
      createdAt: new Date().toISOString()
    },
    'tournament': {
      name: '🔴 Trước Giải — Cường Độ Cao',
      description: 'Bỏ dạy, max tactics (16h), opponent prep. 2-3 tuần trước giải lớn.',
      schedule: JSON.parse(JSON.stringify(SCHEDULE_TOURNAMENT)),
      isDefault: false,
      isBuiltIn: true,
      createdAt: new Date().toISOString()
    },
    'recovery': {
      name: '🟡 Xả Hơi — Sau Giải',
      description: 'Phân tích giải + VODs thư giãn. 36h/tuần. Hồi phục tinh thần.',
      schedule: JSON.parse(JSON.stringify(SCHEDULE_RECOVERY)),
      isDefault: false,
      isBuiltIn: true,
      createdAt: new Date().toISOString()
    }
  };
  localStorage.setItem('chess_schedule_profiles', JSON.stringify(defaultProfiles));
  localStorage.setItem('chess_schedule_profiles_version', String(SCHEDULE_PROFILES_VERSION));
  return defaultProfiles;
}

function getPhaseScheduleMap() {
  const stored = JSON.parse(localStorage.getItem('chess_phase_schedule_map') || 'null');
  if (stored) return stored;
  // Default: all phases use default (opening)
  const map = {};
  TRAINING_CONFIG.phases.forEach(p => { map[p.id] = 'default'; });
  localStorage.setItem('chess_phase_schedule_map', JSON.stringify(map));
  return map;
}

function saveScheduleProfiles(profiles) {
  localStorage.setItem('chess_schedule_profiles', JSON.stringify(profiles));
}

function savePhaseScheduleMap(map) {
  localStorage.setItem('chess_phase_schedule_map', JSON.stringify(map));
}

function getActiveProfileId() {
  const phase = getCurrentPhase();
  const map = getPhaseScheduleMap();
  return map[phase.id] || 'default';
}

function getActiveSchedule() {
  const profileId = getActiveProfileId();
  const profiles = getScheduleProfiles();
  const profile = profiles[profileId];
  if (profile && profile.schedule) return profile.schedule;
  // Fallback to built-in
  return TRAINING_CONFIG.weeklySchedule;
}

function getTodaySchedule() {
  const dayOfWeek = new Date().getDay();
  const schedule = getActiveSchedule();
  return schedule[dayOfWeek];
}

function getSlotContent(slot) {
  if (slot.phaseContent) {
    const phase = getCurrentPhase();
    return slot.phaseContent[phase.id] || slot.description || '';
  }
  return slot.description || '';
}

function timeToMinutes(timeStr) {
  const [h, m] = timeStr.split(':').map(Number);
  return h * 60 + m;
}

function getCurrentSlot() {
  const schedule = getTodaySchedule();
  if (!schedule) return null;
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  for (const slot of schedule.slots) {
    const startMin = timeToMinutes(slot.time);
    const endMin = timeToMinutes(slot.endTime);
    if (currentMinutes >= startMin && currentMinutes < endMin) return slot;
  }
  return null;
}

function getNextSlot() {
  const schedule = getTodaySchedule();
  if (!schedule) return null;
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  for (const slot of schedule.slots) {
    const startMin = timeToMinutes(slot.time);
    if (startMin > currentMinutes) return slot;
  }
  return null;
}

function getPhaseProgress() {
  const phase = getCurrentPhase();
  if (phase.weekStart && phase.weekEnd) {
    const week = getCurrentWeek();
    const phaseWeeks = phase.weekEnd - phase.weekStart + 1;
    const currentPhaseWeek = week - phase.weekStart + 1;
    return Math.min(100, (currentPhaseWeek / phaseWeeks) * 100);
  }
  if (phase.dateStart && phase.dateEnd) {
    const start = new Date(phase.dateStart);
    const end = new Date(phase.dateEnd);
    const now = new Date();
    const total = end - start;
    const elapsed = now - start;
    return Math.min(100, Math.max(0, (elapsed / total) * 100));
  }
  return 0;
}

function getDaysUntilTournament() {
  const tournament = new Date('2026-08-08T00:00:00');
  const now = new Date();
  return Math.max(0, Math.ceil((tournament - now) / (1000 * 60 * 60 * 24)));
}

function getDaysUntilGM() {
  const gm = new Date('2032-03-31T00:00:00');
  const now = new Date();
  return Math.max(0, Math.ceil((gm - now) / (1000 * 60 * 60 * 24)));
}

function formatDate(date) {
  return date.toLocaleDateString('vi-VN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
}

function getMaterialsByTier(tierFilter) {
  const all = [];
  for (const category of ['openings', 'endgames', 'middlegames', 'tactics']) {
    for (const book of TRAINING_CONFIG.materials[category]) {
      if (!tierFilter || (book.tier && book.tier.includes(tierFilter))) {
        all.push({ ...book, category });
      }
    }
  }
  return all;
}

// ═══════════════════════════════════════════
// FIDE ELO AUTO-CRAWL
// ═══════════════════════════════════════════

function getFideId() {
  return localStorage.getItem('chess_fide_id') || TRAINING_CONFIG.playerInfo.fideId || '';
}

function setFideId(id) {
  localStorage.setItem('chess_fide_id', id.trim());
}

async function fetchFideRating(fideId) {
  if (!fideId) throw new Error('No FIDE ID');

  // Method 1: Try the official FIDE API first
  try {
    const apiUrl = `https://app.fide.com/api/v1/member/${fideId}`;
    const r = await fetch(apiUrl, { signal: AbortSignal.timeout(10000) });
    if (r.ok) {
      const data = await r.json();
      const result = { standard: null, rapid: null, blitz: null, name: '' };
      if (data.name) result.name = `${data.name} ${data.surname || ''}`.trim();
      if (data.standard_elo) result.standard = parseInt(data.standard_elo);
      if (data.rapid_elo) result.rapid = parseInt(data.rapid_elo);
      if (data.blitz_elo) result.blitz = parseInt(data.blitz_elo);
      // Also check nested ratings object
      if (!result.standard && data.ratings) {
        if (data.ratings.standard) result.standard = parseInt(data.ratings.standard);
        if (data.ratings.rapid) result.rapid = parseInt(data.ratings.rapid);
        if (data.ratings.blitz) result.blitz = parseInt(data.ratings.blitz);
      }
      if (result.standard || result.rapid || result.blitz) return result;
    }
  } catch (e) { console.warn('FIDE API failed:', e.message); }

  // Method 2: Fall back to CORS proxies for scraping
  const proxies = [
    `https://api.allorigins.win/raw?url=${encodeURIComponent('https://ratings.fide.com/profile/' + fideId)}`,
    `https://corsproxy.io/?${encodeURIComponent('https://ratings.fide.com/profile/' + fideId)}`,
    `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent('https://ratings.fide.com/profile/' + fideId)}`
  ];
  let html = null;
  for (const url of proxies) {
    try {
      const r = await fetch(url, { signal: AbortSignal.timeout(10000) });
      if (r.ok) { html = await r.text(); break; }
    } catch (e) { continue; }
  }
  if (!html) throw new Error('Không thể kết nối FIDE. Thử lại sau.');

  const result = { standard: null, rapid: null, blitz: null, name: '' };

  // Extract name
  const nm = html.match(/<h1[^>]*>([^<]+)<\/h1>/i) || html.match(/<title>([^<]+)<\/title>/i);
  if (nm) result.name = nm[1].replace(/\s*-\s*FIDE.*$/i, '').trim();

  // Extract ratings — multiple patterns for different FIDE HTML versions
  const patterns = [
    /(\d{3,4})\s*<\/div>\s*<div[^>]*>\s*(std|standard|rapid|blitz)/gi,
    /(std|standard|rapid|blitz)\s*<\/div>\s*<div[^>]*>\s*(\d{3,4})/gi,
    /class="[^"]*rating[^"]*"[^>]*>\s*(\d{3,4})\s*<[\s\S]*?(std|standard|rapid|blitz)/gi
  ];
  for (const rp of patterns) {
    let m;
    while ((m = rp.exec(html)) !== null) {
      const parts = m.slice(1);
      let val, type;
      if (/^\d+$/.test(parts[0])) { val = parseInt(parts[0]); type = parts[1].toLowerCase(); }
      else { type = parts[0].toLowerCase(); val = parseInt(parts[1]); }
      if (type === 'std' || type === 'standard') result.standard = result.standard || val;
      else if (type === 'rapid') result.rapid = result.rapid || val;
      else if (type === 'blitz') result.blitz = result.blitz || val;
    }
  }

  // Fallback simple patterns
  if (!result.standard) { const s = html.match(/(\d{3,4})\s*\n?\s*STD/i); if (s) result.standard = parseInt(s[1]); }
  if (!result.rapid) { const s = html.match(/(\d{3,4})\s*\n?\s*RAPID/i); if (s) result.rapid = parseInt(s[1]); }
  if (!result.blitz) { const s = html.match(/(\d{3,4})\s*\n?\s*BLITZ/i); if (s) result.blitz = parseInt(s[1]); }

  return result;
}

async function autoFetchFideElo() {
  const fideId = getFideId();
  if (!fideId) return;
  const lastFetch = localStorage.getItem('chess_fide_last_fetch');
  const now = new Date();
  const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  if (lastFetch === currentMonth) return;
  try {
    const rating = await fetchFideRating(fideId);
    if (rating.standard) {
      const data = JSON.parse(localStorage.getItem('chess_elo_data') || '[]');
      const today = now.toISOString().slice(0, 10);
      if (!data.some(d => d.date === today)) {
        data.push({
          date: today, value: rating.standard,
          note: `🌐 FIDE auto (Std: ${rating.standard}, Rapid: ${rating.rapid || '?'}, Blitz: ${rating.blitz || '?'})`
        });
        localStorage.setItem('chess_elo_data', JSON.stringify(data));
      }
      localStorage.setItem('chess_fide_last_fetch', currentMonth);
      localStorage.setItem('chess_fide_last_rating', JSON.stringify(rating));
      if (typeof App !== 'undefined' && App.showToast) {
        App.showToast(`🌐 FIDE ELO: ${rating.standard} (Std)`);
      }
    }
  } catch (e) {
    console.warn('FIDE auto-fetch failed:', e.message);
  }
}

// ═══════════════════════════════════════════
// localStorage CLEANUP — prune old data
// ═══════════════════════════════════════════

function cleanupOldCompletions(maxDays = 90) {
  try {
    const completions = JSON.parse(localStorage.getItem('chess_completions') || '{}');
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - maxDays);
    const cutoffStr = cutoff.toISOString().slice(0, 10);
    let changed = false;
    for (const key of Object.keys(completions)) {
      const dateStr = key.slice(0, 10); // key format: "YYYY-MM-DD-slotId"
      if (dateStr < cutoffStr) {
        delete completions[key];
        changed = true;
      }
    }
    if (changed) {
      localStorage.setItem('chess_completions', JSON.stringify(completions));
    }
  } catch (e) {
    console.warn('Cleanup failed:', e);
  }
}
