/**
 * TODO:
 *      --> Commands
 *      --> custom caret
 */

/* ============================================== */
/* ================== Commands ================== */
// Man page
help = ''

// screenfetch
whoami = ''

// Git log
history = ''

// apt list
skills = ''
/* ============================================== */
/* ============================================== */

Terminal = {
    recent: [],
    recentpos: -1
  }
  
  $(function() {

    Terminal.focus = function() {
      $('.cmd-ln.active').focus();
      $('#terminal').scrollTop($('#terminal')[0].scrollHeight);
    }

    Terminal.inputKeyup = function(evt, target) {
        var self = target;
        if (evt.keyCode === 13 && $.trim(self.val()) !== '') {  // Enter button with command
          Terminal.recent.push(self.val());
          if (self.val() === 'help') {
            self.parent().append(help);
          } else if(self.val() === 'whoami') {
            self.parent().append(whoami);
          } else if(self.val() === 'history') {
            self.parent().append(history);
          } else if(self.val() === 'skills') {
            self.parent().append(skills);
          } else if(self.val() === 'clear') {
            $('#terminal').html('');
          } else {
            self.parent().append('<p>command not found: ' + self.val() + '</p>');
          }

          self.removeClass('active').attr('disabled','disabled');
          $('#terminal').append('<div class="line"><span class="cmd-p"><span class="user">luislorenzom</span>@<span class="host">github.io</span>: <span class="path">~/portfolio</span>$ </span><input class="cmd-ln active" type="text"></div>');
          $('.cmd-ln.active').keyup(function(e) {
            Terminal.inputKeyup(e, $(this));
          });

          Terminal.recentpos = -1;
      Terminal.focus();
        } else if(evt.keyCode === 38) { // Up arrow button
          
          if (Terminal.recentpos > 0) {
            Terminal.recentpos = Terminal.recentpos-1;
            self.val(Terminal.recent[Terminal.recentpos]);
          } else if (Terminal.recentpos === -1) {
            Terminal.recentpos = Terminal.recent.length;
            self.val(Terminal.recent[Terminal.recent.length - 1]);
          }

        } else if (evt.keyCode === 40) { // Down arrow button
          
          if (Terminal.recentpos < 0 || Terminal.recentpos > Terminal.recent.length-1) {
            Terminal.recentpos = -1;
          }
          if (!(Terminal.recentpos === -1 && Terminal.recent.length !== 0)) {
            self.val(Terminal.recent[Terminal.recentpos + 1]);
            Terminal.recentpos = Terminal.recentpos + 1;
          }

        } else if (evt.keyCode === 13) { // Enter button without command
          $('#terminal').append('<div class="line"><span class="cmd-p"><span class="user">luislorenzom</span>@<span class="host">github.io</span>: <span class="path">~/portfolio</span>$ </span><input class="cmd-ln active" type="text"><span class="cursor"></span></div>');
          $('.cmd-ln.active').keyup(function(e) {
            Terminal.inputKeyup(e, $(this));
          });
        }
        Terminal.focus();
      }
    
    $('#terminal').append('<div class="line"><span class="cmd-p"><span class="user">luislorenzom</span>@<span class="host">github.io</span>: <span class="path">~/portfolio</span>$ </span><input class="cmd-ln active" type="text"><span class="cursor"></span></div>');
    
    $('#terminal').click(function(e) {
      $('.cmd-ln.active').focus();
    });

    $('.cmd-ln.active').keyup(function(e) {
      Terminal.inputKeyup(e, $(this));
    });

    Terminal.focus();
  });  