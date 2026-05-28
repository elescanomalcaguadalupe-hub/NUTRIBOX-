import React, { useEffect } from 'react';
import { motion } from 'motion/react';

interface NotificationsScreenProps {
  sealsCount: number;
  onSelectScreen: (screen: 'welcome' | 'menu' | 'cart' | 'tracking' | 'profile' | 'auth' | 'notifications') => void;
  onReadNotifications: () => void;
}

export default function NotificationsScreen({
  sealsCount,
  onSelectScreen,
  onReadNotifications,
}: NotificationsScreenProps) {
  
  // Mark notifications as read as soon as the screen is opened
  useEffect(() => {
    onReadNotifications();
  }, [onReadNotifications]);

  // Generate dynamic notifications list based on the user's current seals count
  const notificationsList = [];
  
  if (sealsCount >= 6) {
    notificationsList.push({
      id: 'sello-6',
      emoji: '🎉',
      text: '¡Lo lograste! Tienes 6 sellos. Tu próxima NutriBox es GRATIS 🎁',
      date: 'Hoy',
      isNew: true,
      accent: true,
    });
  }
  if (sealsCount >= 5) {
    notificationsList.push({
      id: 'sello-5',
      emoji: '🌟',
      text: '¡Un paso más! Llevas 5 de 6 sellos. Te falta 1 para tu caja gratis 🎁',
      date: sealsCount === 5 ? 'Hoy' : 'Ayer',
      isNew: sealsCount === 5,
    });
  }
  if (sealsCount >= 4) {
    notificationsList.push({
      id: 'sello-4',
      emoji: '🌟',
      text: '¡Casi! Llevas 4 de 6 sellos. Te faltan 2 para tu caja gratis',
      date: sealsCount === 4 ? 'Hoy' : 'Hace un momento',
      isNew: sealsCount === 4,
    });
  }
  if (sealsCount >= 3) {
    notificationsList.push({
      id: 'sello-3',
      emoji: '🌟',
      text: '¡Vas a la mitad! Llevas 3 de 6 sellos. Te faltan 3 para tu caja gratis',
      date: sealsCount === 3 ? 'Hoy' : '22 de Mayo',
      isNew: sealsCount === 3,
    });
  }
  if (sealsCount >= 2) {
    notificationsList.push({
      id: 'sello-2',
      emoji: '🌟',
      text: '¡Vas bien! Llevas 2 de 6 sellos. Te faltan 4 para tu caja gratis',
      date: '18 de Mayo',
      isNew: false,
    });
  }
  if (sealsCount >= 1) {
    notificationsList.push({
      id: 'sello-1',
      emoji: '🌟',
      text: '¡Compraste tu 1ra NutriBox! Llevas 1 de 6 sellos',
      date: '15 de Mayo',
      isNew: false,
    });
  }

  return (
    <div className="bg-slate-50 text-slate-800 min-h-screen pb-24 flex flex-col">
      {/* Header with back button */}
      <header className="w-full sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 py-4 px-5 flex items-center shadow-xs">
        <button 
          onClick={() => onSelectScreen('menu')}
          className="material-icons-span text-2xl text-[#1B5E20] hover:bg-slate-100 p-1.5 rounded-full transition-colors cursor-pointer mr-3"
          aria-label="Volver al menú"
        >
          chevron_left
        </button>
        <h1 className="text-lg font-black font-sans text-slate-800 flex-1">
          Notificaciones
        </h1>
        <div className="w-8 h-8" /> {/* Balance spacer */}
      </header>

      <main className="px-5 pt-6 max-w-2xl mx-auto w-full flex-1 space-y-4">
        {notificationsList.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
            <div className="w-16 h-16 bg-[#1B5E20]/5 rounded-full flex items-center justify-center border border-[#1B5E20]/10 text-slate-400">
              <span className="material-icons-span text-3xl">notifications_off</span>
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-black text-slate-700">No tienes notificaciones aún</h3>
              <p className="text-xs text-slate-400 font-bold max-w-xs leading-normal">
                ¡Haz tu primer pedido NutriBox y empieza a acumular sellos para ganar cajas gratis!
              </p>
            </div>
            <button
              onClick={() => onSelectScreen('menu')}
              className="mt-4 px-6 py-2.5 bg-[#1B5E20] text-white font-black text-xs rounded-xl hover:bg-[#154618] transition-colors cursor-pointer"
            >
              Ver menú de hoy
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <h2 className="text-[10px] font-black uppercase tracking-wider text-slate-400 pl-1">
              Historial de Sellos Académicos Gamarra
            </h2>
            
            <div className="space-y-2.5">
              {notificationsList.map((notif, index) => (
                <motion.div
                  key={notif.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`flex items-start gap-4 p-4 rounded-[20px] border transition-all ${
                    notif.accent 
                      ? 'bg-amber-50/70 border-amber-200/60 shadow-xs' 
                      : notif.isNew
                        ? 'bg-white border-[#1B5E20]/30 shadow-xs ring-1 ring-[#1B5E20]/5'
                        : 'bg-white border-slate-100'
                  }`}
                >
                  {/* Icon badge */}
                  <div className={`w-11 h-11 shrink-0 rounded-full flex items-center justify-center font-bold text-xl ${
                    notif.accent 
                      ? 'bg-amber-100 border border-amber-300' 
                      : 'bg-slate-50 border border-slate-100'
                  }`}>
                    {notif.emoji}
                  </div>

                  {/* Content */}
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className={`text-xs font-black leading-tight ${
                        notif.accent ? 'text-amber-900' : 'text-slate-800'
                      }`}>
                        {notif.text}
                      </p>
                      {notif.isNew && (
                        <span className="shrink-0 bg-[#fc9d41] text-white text-[8px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-wider scale-90">
                          Nuevo
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between text-[10px] font-bold text-slate-400">
                      <span>{notif.date}</span>
                      <span className="flex items-center gap-1 text-[#1B5E20]">
                        <span className="material-icons-span text-[10px]">stars</span>
                        <span>Seals Reward</span>
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Floating total display helper card */}
      <div className="max-w-2xl mx-auto w-full px-5 mt-6 shrink-0">
        <div className="bg-gradient-to-r from-[#1B5E20] to-[#2E7D32] p-5 rounded-[24px] text-white space-y-3.5 shadow-lg shadow-[#1B5E20]/15 relative overflow-hidden">
          <div className="absolute top-[-20%] right-[-10%] w-32 h-32 bg-white/5 rounded-full blur-xl" />
          
          <div className="flex items-center gap-3">
            <span className="material-icons-span text-amber-300 text-2xl">local_activity</span>
            <div className="space-y-0.5 text-left">
              <h4 className="text-xs font-black tracking-wide uppercase">Progreso actual</h4>
              <p className="text-sm font-black">Llevas {sealsCount} de 6 sellos</p>
            </div>
          </div>

          <div className="w-full bg-white/10 h-2.5 rounded-full overflow-hidden border border-white/5">
            <div 
              className="bg-amber-300 h-full rounded-full transition-all duration-500"
              style={{ width: `${(Math.min(6, sealsCount) / 6) * 100}%` }}
            />
          </div>

          <p className="text-[11px] font-bold text-emerald-100 leading-normal">
            {sealsCount >= 6 
              ? '🎉 ¡Enhorabuena! Has completado tu tarjeta. Tu próximo pedido NutriBox es 100% gratis.'
              : `💡 Te faltan solo ${6 - sealsCount} pedidos para conseguir una NutriBox completamenta gratis.`}
          </p>
        </div>
      </div>
    </div>
  );
}
