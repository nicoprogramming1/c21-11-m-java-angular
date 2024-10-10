package com.no_country.demo.entities;

import com.no_country.demo.entities.enums.DiaSemana;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Asignatura {
    private String asignatura;
    private Profesor profesor;
    private String temas;
    private String descripcion;
    private List<Evaluacion> evaluacinoes;
    private Date horario;
    private List<DiaSemana> dias;
}
