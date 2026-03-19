/**
 * Chess Training Planner — Schedule Data
 * Extensible structure: add phases/weeks/slots freely
 */

const TRAINING_CONFIG = {
  startDate: '2026-03-20', // Friday → first real training day is Sat 21
  playerInfo: {
    name: 'Chess Warrior',
    startElo: 1800,
    targetElo: 2000,
    startWeight: 82,
    targetWeight: 73,
    height: 171,
    tournament: 'ASEAN Age Group U2000 — Singapore, August 2026'
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
          id: 'mon-1',
          time: '05:00',
          endTime: '06:00',
          type: 'exercise',
          icon: '🏃',
          title: 'Chạy bộ Zone 2 (45p) + Stretching',
          description: 'Cardio giảm cân, HR 120-140bpm. 15 phút stretching sau chạy.'
        },
        {
          id: 'mon-2',
          time: '06:00',
          endTime: '09:00',
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
        }
      ]
    },

    2: { // Tuesday
      name: 'Thứ 3',
      isRest: false,
      slots: [
        {
          id: 'tue-1',
          time: '05:00',
          endTime: '06:00',
          type: 'exercise',
          icon: '💪',
          title: 'Dumbbell Upper Body (50p) + Stretch',
          description: 'Chest press, rows, shoulder press, bicep curls, tricep extensions. 3 sets x 12 reps.'
        },
        {
          id: 'tue-2',
          time: '06:00',
          endTime: '09:00',
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
          endTime: '16:30',
          type: 'tactics',
          icon: '🧩',
          title: 'Bài tập chiến thuật',
          duration: '1.5h',
          phaseContent: {
            1: 'KCT: Focus pattern recognition. 15-20 bài.',
            2: 'KCT: Combinations + tăng độ khó. 20 bài.',
            3: 'KCT: Deep calculation. 20+ bài.',
            4: 'KCT: Duy trì 15 bài/ngày.'
          }
        },
        {
          id: 'tue-9',
          time: '16:30',
          endTime: '17:00',
          type: 'meal',
          icon: '🍽️',
          title: 'Bữa tối',
          description: 'Salad protein + khoai lang (~600kcal). IF window đóng.'
        },
        {
          id: 'tue-10',
          time: '17:00',
          endTime: '19:00',
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
          id: 'wed-1',
          time: '05:00',
          endTime: '06:00',
          type: 'exercise',
          icon: '🏃',
          title: 'Chạy bộ Zone 2 (45p) + Stretching',
          description: 'Cardio, HR 120-140bpm. 15 phút stretching.'
        },
        {
          id: 'wed-2',
          time: '06:00',
          endTime: '09:00',
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
        }
      ]
    },

    4: { // Thursday
      name: 'Thứ 5',
      isRest: false,
      slots: [
        {
          id: 'thu-1',
          time: '05:00',
          endTime: '06:00',
          type: 'exercise',
          icon: '💪',
          title: 'Dumbbell Lower Body (50p) + Stretch',
          description: 'Goblet squats, lunges, RDL, calf raises. 3 sets x 12-15 reps.'
        },
        {
          id: 'thu-2',
          time: '06:00',
          endTime: '09:00',
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
          endTime: '16:30',
          type: 'tactics',
          icon: '🧩',
          title: 'Bài tập chiến thuật',
          duration: '1.5h',
          phaseContent: {
            1: 'KCT: 15-20 bài. Mix themes.',
            2: 'KCT: 20 bài. Harder puzzles.',
            3: 'KCT: 20+ bài. Deep calculation practice.',
            4: 'KCT: 15 bài. Maintain sharpness.'
          }
        },
        {
          id: 'thu-9',
          time: '16:30',
          endTime: '17:00',
          type: 'meal',
          icon: '🍽️',
          title: 'Bữa tối',
          description: 'Salad protein (~600kcal). IF window đóng.'
        },
        {
          id: 'thu-10',
          time: '17:00',
          endTime: '19:00',
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
          id: 'sat-1',
          time: '05:00',
          endTime: '06:00',
          type: 'exercise',
          icon: '💪',
          title: 'Dumbbell Full Body (50p) + Stretch',
          description: 'Total body: compound movements. Push-ups, squats, rows, lunges, planks.'
        },
        {
          id: 'sat-2',
          time: '06:00',
          endTime: '09:00',
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
          endTime: '16:30',
          type: 'mixed',
          icon: '♟️',
          title: 'Trung cuộc / Tàn cuộc',
          duration: '1.5h',
          phaseContent: {
            1: 'Mixed review: positional concepts + endgame practice.',
            2: 'Chess Structures + endgame drills.',
            3: 'Advanced themes. Piece coordination, dynamic play.',
            4: 'Ôn tập tổng hợp.'
          }
        },
        {
          id: 'sat-9',
          time: '16:30',
          endTime: '17:00',
          type: 'meal',
          icon: '🍽️',
          title: 'Bữa tối',
          description: 'Salad protein (~600kcal). IF window đóng.'
        },
        {
          id: 'sat-10',
          time: '17:00',
          endTime: '19:00',
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
      { id: 'reti', name: 'Reti Opening', author: 'GM Arturs Neiksans', platform: 'Chessable', color: 'White' },
      { id: 'scandinavian', name: 'Scandinavian Defense', author: 'GM Arturs Neiksans', platform: 'Chessable', color: 'Black vs 1.e4' },
      { id: 'dutch', name: 'Dutch Leningrad', author: 'GM Arturs Neiksans', platform: 'Chessable', color: 'Black vs 1.d4' }
    ],
    endgames: [
      { id: 'eg1', name: "Silman's Complete Endgame Course", author: 'IM Jeremy Silman', priority: 1 },
      { id: 'eg2', name: '100 Endgames You Must Know', author: 'GM Jesus de la Villa', priority: 2 },
      { id: 'eg3', name: 'Endgame Strategy', author: 'Mikhail Shereshevsky', priority: 3 },
      { id: 'eg4', name: 'Mastering Endgame Strategy', author: 'GM Johan Hellsten', priority: 4 },
      { id: 'eg5', name: 'Endgame Studies 101', author: 'IM Kostya Kavutskiy', priority: 5 }
    ],
    middlegames: [
      { id: 'mg1', name: 'U2000 Foundation of Positional Play', author: 'IM Renier Castellanos', platform: 'KCT', priority: 1 },
      { id: 'mg2', name: 'Techniques of Positional Play', author: 'Valeri Bronznik & GM Peter Heine Nielsen', priority: 2 },
      { id: 'mg3', name: 'Mastering Chess Strategy', author: 'GM Johan Hellsten', priority: 3 },
      { id: 'mg4', name: 'Chess Structures — A Grandmaster Guide', author: 'GM Mauricio Flores Rios', priority: 4 },
      { id: 'mg5', name: 'The Complete Manual of Positional Chess (Tập 1 & 2)', author: 'GM Konstantin Sakaev & GM Konstantin Landa', priority: 5 },
      { id: 'mg6', name: 'Killer Chess Training (Membership)', author: 'killerchesstraining.com', platform: 'Web', type: 'membership', priority: 6 }
    ],
    tactics: [
      { id: 'kct', name: 'Killer Chess Training', platform: 'killerchesstraining.com', type: 'membership' }
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
  const phases = TRAINING_CONFIG.phases;
  return phases[phases.length - 1].weekEnd;
}

function getCurrentPhase() {
  const week = getCurrentWeek();
  for (const phase of TRAINING_CONFIG.phases) {
    if (week >= phase.weekStart && week <= phase.weekEnd) {
      return phase;
    }
  }
  // If beyond all phases, return last phase
  return TRAINING_CONFIG.phases[TRAINING_CONFIG.phases.length - 1];
}

function getTodaySchedule() {
  const dayOfWeek = new Date().getDay(); // 0=Sun, 1=Mon...6=Sat
  return TRAINING_CONFIG.weeklySchedule[dayOfWeek];
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
    if (currentMinutes >= startMin && currentMinutes < endMin) {
      return slot;
    }
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
    if (startMin > currentMinutes) {
      return slot;
    }
  }
  return null;
}

function getPhaseProgress() {
  const phase = getCurrentPhase();
  const week = getCurrentWeek();
  const phaseWeeks = phase.weekEnd - phase.weekStart + 1;
  const currentPhaseWeek = week - phase.weekStart + 1;
  return Math.min(100, (currentPhaseWeek / phaseWeeks) * 100);
}

function getDaysUntilTournament() {
  const tournament = new Date('2026-08-08T00:00:00');
  const now = new Date();
  return Math.max(0, Math.ceil((tournament - now) / (1000 * 60 * 60 * 24)));
}

function formatDate(date) {
  return date.toLocaleDateString('vi-VN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
}
