package com.costache.shop.components;

import com.costache.shop.entities.Desktop;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.core.annotation.HandleAfterCreate;
import org.springframework.data.rest.core.annotation.HandleAfterDelete;
import org.springframework.data.rest.core.annotation.HandleAfterSave;
import org.springframework.data.rest.core.annotation.RepositoryEventHandler;
import org.springframework.hateoas.server.EntityLinks;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

import static com.costache.shop.components.WebSocketConfiguration.*;

@Component
@RepositoryEventHandler(Desktop.class)
public class EventHandler {

    private final SimpMessagingTemplate websocket;

    private final EntityLinks entityLinks;

    @Autowired
    public EventHandler(SimpMessagingTemplate websocket, EntityLinks entityLinks){
        this.websocket = websocket;
        this.entityLinks = entityLinks;
    }

    @HandleAfterCreate
    public void newDesktop(Desktop desktop){
        this.websocket.convertAndSend(
                MESSAGE_PREFIX + "/newDesktop", getPath(desktop));
    }

    @HandleAfterDelete
    public void deleteDesktop(Desktop desktop) {
        this.websocket.convertAndSend(
                MESSAGE_PREFIX + "/deleteEmployee", getPath(desktop));
    }

    @HandleAfterSave
    public void updateDesktop(Desktop desktop) {
        this.websocket.convertAndSend(
                MESSAGE_PREFIX + "/updateEmployee", getPath(desktop));
    }

    private String getPath(Desktop desktop) {
        return this.entityLinks.linkForItemResource(desktop.getClass(),
                desktop.getId()).toUri().getPath();
    }

}